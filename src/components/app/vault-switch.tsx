import * as React from "react";
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Vault, useSettings } from "@/contexts/settings";
import { open as openDialog } from "@tauri-apps/plugin-dialog";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface VaultSwitcherProps extends PopoverTriggerProps {}

export default function VaultSwitch({ className }: VaultSwitcherProps) {
    const { state, set, createVault, load } = useSettings();
    const [open, setOpen] = React.useState(false);

    const [showNewVaultDialog, setShowNewVaultDialog] = React.useState(false);
    const [newVaultName, setNewVaultName] = React.useState("");
    const [newVaultPath, setNewVaultPath] = React.useState("");
    const [newVaultLoading, setNewVaultLoading] = React.useState(false);
    const [currentVault, setCurrentVault] = React.useState<Vault>({
        name: "Loading...",
        id: 0,
        path: "",
    });

    React.useEffect(() => {
        const currentVault = state.vault.list.find(
            (x) => x.id === state.vault.current
        );

        if (currentVault) {
            setCurrentVault(currentVault);
        } else {
            set("vault", { ...state.vault, current: state.vault.list[0].id });
        }
    }, []);

    const handleCreateVault = async () => {
        setNewVaultLoading(true);
        await createVault(newVaultName, newVaultPath).then(async (res) => {
            if (res) {
                setShowNewVaultDialog(false);
                await load();
            }
        });
        setNewVaultLoading(false);
    };

    return (
        <Dialog open={showNewVaultDialog} onOpenChange={setShowNewVaultDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a vault"
                        className={cn("w-full justify-between", className)}
                    >
                        <Avatar className="w-5 h-5 mr-2">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${currentVault.name}.png`}
                                alt={currentVault.name}
                                className="grayscale"
                            />
                            <AvatarFallback>NV</AvatarFallback>
                        </Avatar>
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {currentVault.name}
                        </span>
                        <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[215px] p-0 my-1">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search vault..." />
                            <CommandEmpty>No vault found.</CommandEmpty>

                            <CommandGroup heading="Vaults">
                                {state.vault.list.map((vault, index) => (
                                    <CommandItem
                                        key={index}
                                        onSelect={async () => {
                                            await setCurrentVault(vault);
                                            setOpen(false);
                                        }}
                                        className="text-sm"
                                    >
                                        <Avatar className="w-5 h-5 mr-2">
                                            <AvatarImage
                                                src={`https://avatar.vercel.sh/${vault.name}.png`}
                                                alt={vault.name}
                                                className="grayscale"
                                            />
                                            <AvatarFallback>NV</AvatarFallback>
                                        </Avatar>
                                        {vault.name}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentVault?.id === vault.id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false);
                                            setShowNewVaultDialog(true);
                                        }}
                                    >
                                        <PlusCircledIcon className="w-5 h-5 mr-2" />
                                        Create Vault
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create vault</DialogTitle>
                    <DialogDescription>
                        Create a new vault to seperate your notes between
                        different environments.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="py-2 pb-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Vault name</Label>
                            <Input
                                id="name"
                                placeholder="Personal Vault"
                                value={newVaultName}
                                onChange={(e) =>
                                    setNewVaultName(e.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Location</Label>
                            <div className="flex flex-row items-center gap-2">
                                <Input
                                    value={newVaultPath}
                                    disabled
                                    placeholder="~/tygrdev/notes"
                                    className="w-full"
                                />
                                <Button
                                    variant="secondary"
                                    className="h-9"
                                    onClick={async () => {
                                        await openDialog({
                                            multiple: false,
                                            directory: true,
                                            title: "Select a location for your new vault",
                                            recursive: true,
                                        })
                                            .then((path) => {
                                                if (path) {
                                                    setNewVaultPath(path);
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
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowNewVaultDialog(false)}
                        disabled={newVaultLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleCreateVault}
                        disabled={newVaultLoading}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
