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

const groups = [
    {
        label: "Vaults",
        vaults: [
            {
                label: "Personal",
                value: "personal",
            },
            {
                label: "School",
                value: "school",
            },
            {
                label: "Work",
                value: "work",
            },
        ],
    },
    {
        label: "Nota",
        vaults: [
            {
                label: "Documentation",
                value: "docs",
            },
        ],
    },
];

type Vault = (typeof groups)[number]["vaults"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface VaultSwitcherProps extends PopoverTriggerProps {}

export default function VaultSwitch({ className }: VaultSwitcherProps) {
    const [open, setOpen] = React.useState(false);
    const [showNewVaultDialog, setShowNewVaultDialog] = React.useState(false);
    const [selectedVault, setSelectedVault] = React.useState<Vault>(
        groups[0].vaults[0]
    );

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
                                src={`https://avatar.vercel.sh/${selectedVault.value}.png`}
                                alt={selectedVault.label}
                                className="grayscale"
                            />
                            <AvatarFallback>NV</AvatarFallback>
                        </Avatar>
                        {selectedVault.label}
                        <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[215px] p-0 my-1">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search vault..." />
                            <CommandEmpty>No vault found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup
                                    key={group.label}
                                    heading={group.label}
                                >
                                    {group.vaults.map((vault) => (
                                        <CommandItem
                                            key={vault.value}
                                            onSelect={() => {
                                                setSelectedVault(vault);
                                                setOpen(false);
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="w-5 h-5 mr-2">
                                                <AvatarImage
                                                    src={`https://avatar.vercel.sh/${vault.value}.png`}
                                                    alt={vault.label}
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>
                                                    SC
                                                </AvatarFallback>
                                            </Avatar>
                                            {vault.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedVault.value ===
                                                        vault.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
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
                            <Input id="name" placeholder="Personal Vault" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowNewVaultDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
