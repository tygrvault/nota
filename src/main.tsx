import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./components/theme/provider";
import { cn } from "./lib/utils";

import App from "./app";

import "./globals.css";
import { Toaster } from "./components/ui/sonner";

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ThemeProvider defaultTheme="dark" storageKey="theme">
                <main
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        "[&_.slate-selected]:!bg-primary/20 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary [&_.slate-selection-area]:bg-primary/10"
                    )}
                >
                    <Toaster />
                    <App />
                </main>
            </ThemeProvider>
        </React.StrictMode>
    );
}
