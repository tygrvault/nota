import { Cog, FileIcon, Home, Search } from "lucide-react";
import { SideBarList, SideBarListProps } from "./list";
import VaultSwitch from "../vault-switch";
import { Separator } from "../../ui/separator";
import { ThemeToggle } from "../../theme/toggle";
import { Label } from "../../ui/label";

const sysLinks: SideBarListProps["links"] = [
    {
        title: "Search",
        icon: Search,
        variant: "ghost",
    },
    {
        title: "Home",
        icon: Home,
        variant: "ghost",
    },
    {
        title: "Settings",
        icon: Cog,
        variant: "ghost",
    },
];

const notes: SideBarListProps["links"] = [
    {
        title: "Welcome to Nota!",
        icon: FileIcon,
        variant: "default",
    },
];

export default function Navbar() {
    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-screen border-r max-w-[240px] border-black/10 dark:border-white/10">
                <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col items-center w-full gap-3 p-3">
                        <VaultSwitch />
                        <SideBarList links={sysLinks} />
                    </div>
                    <Separator />
                    <div className="flex flex-col items-start w-full gap-3 p-3 pt-4">
                        <Label className="p-0 ml-3 text-neutral-500 dark:text-neutral-400">
                            Notes
                        </Label>
                        <SideBarList links={notes} />
                    </div>
                </div>
                <div className="flex flex-col items-start w-full gap-2 p-3">
                    <ThemeToggle big />
                </div>
            </div>
        </>
    );
}
