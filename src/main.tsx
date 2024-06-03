import ReactDOM from "react-dom/client";

// Misc
import { cn } from "./lib/utils";

// Global Providers
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme/provider";
import { SettingsProvider } from "./contexts/settings";

// App
import App from "./app";
import "./globals.css";

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <main
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    "[&_.slate-selected]:!bg-primary/20 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary [&_.slate-selection-area]:bg-primary/10"
                )}
            >
                <TooltipProvider delayDuration={0} disableHoverableContent>
                    <SettingsProvider>
                        <Toaster />
                        <App />
                    </SettingsProvider>
                </TooltipProvider>
            </main>
        </ThemeProvider>
    );
}
