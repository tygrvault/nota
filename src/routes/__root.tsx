import { createRootRoute, Outlet } from "@tanstack/react-router";

import Navbar from "@/components/app/sidebar";

export const Route = createRootRoute({
    component: () => (
        <>
            {/* TODO: Makes spacing on the horizontal plane weird */}
            <Navbar />
            <div className="w-screen-no-nav">
                <Outlet />
            </div>
        </>
    ),
});
