import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme/provider";

export function ThemeToggle({ big = false }: { big?: boolean }) {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size={big ? "default" : "icon"}
                    className="flex flex-row items-center data-[big=true]:justify-start justify-center data-[big=true]:gap-2 data-[big=true]:w-full"
                    data-big={big}
                >
                    <Sun className="w-5 h-5 dark:hidden" />
                    <Moon className="hidden w-5 h-5 dark:block" />
                    <span className="sr-only">Toggle theme</span>
                    <span>{big ? "Toggle theme" : ""}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
