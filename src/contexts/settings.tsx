import { Store } from "@tauri-apps/plugin-store";
import { createContext, useContext, useEffect, useState } from "react";

export interface Vault {
    name: string;
    path: string;
}

export interface SettingsContextType {
    state: {
        onboarding: {
            complete: boolean;
        };
        vault: {
            list: Vault[];
            current: number;
        };
    };

    get: (key: string) => Promise<unknown>;
    set: (key: string, value: unknown) => Promise<unknown>;
    remove: (key: string) => Promise<boolean>;
    save: () => Promise<boolean>;
    load: () => Promise<boolean>;
}

export const SettingsContext = createContext<SettingsContextType>({
    state: {
        onboarding: {
            complete: false,
        },
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
});

export const SettingsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const store = new Store("settings.json");

    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<SettingsContextType["state"]>({
        onboarding: {
            complete: false,
        },
        vault: {
            list: [],
            current: 0,
        },
    });

    useEffect(() => {
        const getAllEntries = async () => {
            const e = await store.entries();
            console.log(e);
            e.forEach((v: any) => {
                setState({ ...state, [v[0]]: v[1] });
            });

            console.log(state);

            setLoading(false);
        };

        getAllEntries().catch(console.error);
    }, []);

    async function get(key: string) {
        const data: unknown = await store.get(key);
        return data;
    }

    async function set(key: string, value: unknown) {
        const res = await store
            .set(key, value)
            .then(() => {
                setState({ ...state, [key]: value });
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

    async function load(clear?: boolean) {
        const res = await store
            .load()
            .then(async () => {
                setLoading(true);

                if (clear) {
                    await store.clear();
                    setState({
                        onboarding: {
                            complete: false,
                        },
                        vault: {
                            list: [],
                            current: 0,
                        },
                    });
                }

                const e = await store.entries();
                e.forEach((v: any) => {
                    setState({ ...state, [v[0]]: v[1] });
                });
                setLoading(false);
                return true;
            })
            .catch(() => {
                return false;
            });

        return res;
    }

    return (
        <>
            <SettingsContext.Provider
                value={{ state, get, set, remove, save, load }}
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
