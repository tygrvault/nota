import { invoke } from "@tauri-apps/api/core";
import { Store } from "@tauri-apps/plugin-store";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface Vault {
    id: number;
    name: string;
    path: string;
}

export interface SettingsContextType {
    state: {
        onboarding: boolean;
        vault: {
            list: Vault[];
            current: number;
        };
    };

    get: (key: string) => Promise<unknown>;
    set: (
        key: string,
        value: unknown,
        refreshState?: boolean
    ) => Promise<unknown>;
    remove: (key: string) => Promise<boolean>;
    save: () => Promise<boolean>;
    load: () => Promise<boolean>;

    createVault: (name: string, path: string) => Promise<boolean>;
}

export const SettingsContext = createContext<SettingsContextType>({
    state: {
        onboarding: false,
        vault: {
            list: [],
            current: 0,
        },
    },

    get: async () => Promise.resolve(),
    set: async () => Promise.resolve(false),
    remove: async () => Promise.resolve(false),
    save: async () => Promise.resolve(false),
    load: async () => Promise.resolve(false),
    createVault: async () => Promise.resolve(false),
});

export const SettingsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const store = new Store("settings.json");

    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<SettingsContextType["state"]>({
        onboarding: false,
        vault: {
            list: [],
            current: 0,
        },
    });

    useEffect(() => {
        load().then(() => {
            setLoading(false);
        });
    }, []);

    async function get(key: string) {
        const data: unknown = await store.get(key);
        return data;
    }

    async function set(key: string, value: unknown, refreshState?: boolean) {
        const res = await store
            .set(key, value)
            .then(async () => {
                await save();
            })
            .then(async () => {
                if (refreshState) {
                    await load();
                }

                return true;
            })
            .catch(() => {
                return false;
            });

        return res;
    }

    async function remove(key: string) {
        const res = await store
            .delete(key)
            .then(() => {
                setState({ ...state, [key]: undefined });
                return true;
            })
            .catch(() => {
                return false;
            });

        return res;
    }

    async function save() {
        const res = await store
            .save()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });

        return res;
    }

    async function load() {
        const res = store
            .entries()
            .then((e: [key: string, value: any][]) => {
                const data: SettingsContextType["state"] = {
                    onboarding: false,
                    vault: {
                        list: [],
                        current: 0,
                    },
                };

                e.forEach(([key, value]) => {
                    data[key as keyof typeof data] = value;
                });

                setState(data);
                return true;
            })
            .catch((e) => {
                toast.error("Failed to load settings.", { description: e });
                return false;
            });

        return res;
    }

    async function createVault(name: string, path: string) {
        if (name.length < 1) {
            toast.error("Please enter a name for your vault");
            return false;
        }

        if (path.length < 1) {
            toast.error("Please select a location for your vault");
            return false;
        }

        const res = await invoke("create_vault", {
            name: name,
            path: path,
        })
            .then(async () => {
                toast.success(`Created the vault ${name} successfully!`);
                return true;
            })
            .catch((e) => {
                toast.error("Something went wrong", {
                    description: e,
                });
                return false;
            });

        return res;
    }

    return (
        <>
            <SettingsContext.Provider
                value={{ state, get, set, remove, save, load, createVault }}
            >
                {!loading && children}
            </SettingsContext.Provider>
        </>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
