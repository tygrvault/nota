import { RouterProvider, createRouter } from "@tanstack/react-router";

// Global Providers
import { useSettings } from "./contexts/settings";

// Hooks
import usePreventContext from "./hooks/use-prevent-context";
import usePreventZoom from "./hooks/use-prevent-zoom";

// Routes
import { routeTree } from "./routeTree.gen";
const router = createRouter({ routeTree });

// Misc
import Onboarding from "./components/onboarding";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    usePreventContext();
    usePreventZoom();

    const { state } = useSettings();

    return (
        <>
            {state.onboarding ? (
                <>
                    <div className="flex flex-col min-h-screen">
                        <div className="flex flex-row flex-1">
                            <RouterProvider router={router} />
                        </div>
                    </div>
                </>
            ) : (
                <Onboarding />
            )}
        </>
    );
}
