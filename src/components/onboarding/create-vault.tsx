import { useState } from "react";
import { Button } from "../ui/button";
import { invoke } from "@tauri-apps/api/core";
import { useOnboarding } from ".";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { open } from "@tauri-apps/plugin-dialog";

export default function CreateVault() {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [loading, setLoading] = useState(false);

    const { prevStep, nextStep } = useOnboarding();

    async function createVault() {
        if (name.length < 1) {
            return toast.error("Please enter a name for your vault");
        }

        if (path.length < 1) {
            return toast.error("Please select a location for your vault");
        }

        setLoading(true);

        await invoke("create_vault", { name, path })
            .then(async () => {
                setLoading(false);
                nextStep();
            })
            .catch((e) => {
                toast.error("Something went wrong", {
                    description: e,
                });
            });
    }
	
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen gap-8 p-32 text-center">
                <div className="flex flex-col items-center justify-center gap-1">
                    <h1 className="text-4xl font-bold">Create a vault</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        A vault is where all your notes are stored. You can
                        create multiple vaults to organize your notes.
                    </p>
                </div>
                <div className="flex flex-col items-center w-full gap-4">
                    <div className="flex flex-col items-start w-full gap-2">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-start w-full gap-2">
                        <Label>Location</Label>
                        <div className="flex flex-row gap-2">
                            <Input value={path} className="min-w-full" />
                            <Button
                                variant="secondary"
                                className="h-9"
                                onClick={async () => {
                                    await open({
                                        multiple: false,
                                        directory: true,
                                        title: "Select a location for your vault",
                                        recursive: true,
                                    })
                                        .then((path) => {
                                            if (path) {
                                                setPath(path);
                                            }
                                        })
                                        .catch((e) => {
                                            console.error(e);
                                        });
                                }}
                            >
                                Browse
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <Button variant="secondary" onClick={() => prevStep()}>
                        Back
                    </Button>
                    <Button disabled={loading} onClick={() => createVault()}>
                        {loading ? "Creating vault..." : "Create Vault"}
                    </Button>
                </div>
            </div>
        </>
    );
}
