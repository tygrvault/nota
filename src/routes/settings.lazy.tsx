import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/settings";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";
import { Store } from "@tauri-apps/plugin-store";

export const Route = createLazyFileRoute("/settings")({
    component: () => {
        return (
            <>
                <ScrollArea className="h-screen">
                    <Settings />
                </ScrollArea>
            </>
        );
    },
});

function Settings() {
    const { state, load, remove, save } = useSettings();

    const handleVaultDelete = async (id: number) => {
        const res = await invoke("delete_vault", { id })
            .then(async () => {
                await load();
                return true;
            })
            .catch((err) => {
                toast.error("Failed to delete vault.", {
                    description: err,
                });
                return false;
            });

        return res;
    };

    return (
        <>
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">Vaults</h1>
                        <p className="text-neutral-500 dark:text-neutral-400">
                            Manage your vaults here.
                        </p>
                    </div>
                    <div className="flex flex-col items-start w-full gap-2">
                        {state.vault.list.map((vault) => {
                            return (
                                <>
                                    <div
                                        className="flex flex-col items-start w-full p-2"
                                        key={vault.id}
                                    >
                                        <div className="flex flex-col w-full gap-4">
                                            <div className="flex flex-row items-center justify-between gap-4">
                                                <div className="flex flex-row items-center gap-2">
                                                    <Avatar className="w-6 h-6">
                                                        <AvatarImage
                                                            src={`https://avatar.vercel.sh/${vault.name}.png`}
                                                            alt={vault.name}
                                                            className="grayscale"
                                                        />
                                                        <AvatarFallback>
                                                            NV
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <h1 className="text-lg font-semibold">
                                                        {vault.name}
                                                    </h1>
                                                    <span className="text-neutral-500 dark:text-neutral-400">
                                                        •
                                                    </span>
                                                    <span className="text-neutral-500 dark:text-neutral-400">
                                                        {vault.id}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row items-center gap-3">
                                                    <Button
                                                        variant="destructive"
                                                        className="h-9"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleVaultDelete(
                                                                vault.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        className="h-9"
                                                        size="sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">Danger</h1>
                        <p className="text-neutral-500 dark:text-neutral-400">
                            Here be dragons.
                        </p>
                        <div className="flex flex-col items-start gap-4">
                            <Button
                                onClick={async () => {
                                    const store = new Store("settings.json");

                                    await store.reset();
                                    await load();
                                }}
                            >
                                Reset All Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
