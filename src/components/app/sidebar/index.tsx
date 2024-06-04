import { Cog, FileIcon, Home, Search } from "lucide-react";
import VaultSwitch from "../vault-switch";
import { Separator } from "../../ui/separator";
import { ThemeToggle } from "../../theme/toggle";
import { Label } from "../../ui/label";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
    return (
        <>
            <div className="flex flex-col items-center justify-between w-full h-screen border-r max-w-[240px] border-black/10 dark:border-white/10">
                <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col items-center w-full gap-3 p-3">
                        <VaultSwitch />
                        <div className="flex flex-col w-full gap-4 group">
                            <nav className="grid gap-1">
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    Search
                                </Button>

                                <Link
                                    to="/"
                                    className={cn(
                                        buttonVariants({
                                            variant: "ghost",
                                            size: "default",
                                        }),
                                        "justify-start"
                                    )}
                                    activeProps={{
                                        className:
                                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                    }}
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Home
                                </Link>

                                <Link
                                    to="/settings"
                                    className={cn(
                                        buttonVariants({
                                            variant: "ghost",
                                            size: "default",
                                        }),
                                        "justify-start"
                                    )}
                                    activeProps={{
                                        className:
                                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                    }}
                                >
                                    <Cog className="w-4 h-4 mr-2" />
                                    Settings
                                </Link>
                            </nav>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col items-start w-full gap-3 p-3 pt-4">
                        <Label className="p-0 ml-3 text-neutral-500 dark:text-neutral-400">
                            Notes
                        </Label>
                        <div className="flex flex-col w-full gap-4 group">
                            <nav className="grid gap-1">
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    <FileIcon className="w-4 h-4 mr-2" />
                                    Welcome to Nota!
                                </Button>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start w-full gap-2 p-3">
                    <ThemeToggle big />
                </div>
            </div>
        </>
    );
}
