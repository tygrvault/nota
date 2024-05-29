import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export interface SideBarListProps {
    links: {
        title: string;
        label?: any;
        icon: any;
        variant: "default" | "ghost";
    }[];
}

export function SideBarList({ links }: SideBarListProps) {
    return (
        <div className="flex flex-col w-full gap-4 group">
            <nav className="grid gap-1">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to="/"
                        className={cn(
                            buttonVariants({
                                variant: link.variant,
                                size: "default",
                            }),
                            link.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start"
                        )}
                    >
                        <link.icon className="w-4 h-4 mr-2" />
                        {link.title}
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
