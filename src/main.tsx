import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "./components/theme/provider";
import { TooltipProvider } from "./components/ui/tooltip";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

import "./globals.css";
import Context from "./components/app/context";
import { cn } from "./lib/utils";

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ThemeProvider defaultTheme="system" storageKey="theme">
                <main
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        "[&_.slate-selected]:!bg-primary/20 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary [&_.slate-selection-area]:bg-primary/10"
                    )}
                    suppressHydrationWarning
                >
                    <TooltipProvider delayDuration={0} disableHoverableContent>
                        <Context />
                        <div className="relative flex flex-col min-h-screen">
                            <div className="flex-1 flex flex-row">
                                <RouterProvider router={router} />
                            </div>
                        </div>
                    </TooltipProvider>
                </main>
            </ThemeProvider>
        </React.StrictMode>
    );
}
