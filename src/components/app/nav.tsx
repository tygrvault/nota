import { Cog, Folder } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ThemeToggle } from "../theme/toggle";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <>
            <div className="max-w-14 w-full h-screen border-r px-4 py-2 border-black/10 dark:border-white/10 flex flex-col items-center justify-between">
                <div className="flex flex-col gap-4 items-center">
                    <Link to="/">
                        <div className="flex items-center">
                            <Tooltip>
                                <TooltipContent side="right" sideOffset={10}>
                                    All Notes
                                </TooltipContent>
                                <TooltipTrigger>
                                    <Button size="icon" variant="ghost">
                                        <Folder className="w-5 h-5" />
                                    </Button>
                                </TooltipTrigger>
                            </Tooltip>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <ThemeToggle />
                    <Link to="/settings">
                        <div className="flex items-center">
                            <Tooltip>
                                <TooltipContent side="right" sideOffset={10}>
                                    Settings
                                </TooltipContent>
                                <TooltipTrigger>
                                    <Button size="icon" variant="ghost">
                                        <Cog className="w-5 h-5" />
                                    </Button>
                                </TooltipTrigger>
                            </Tooltip>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
