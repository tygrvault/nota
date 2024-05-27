import { createRootRoute, Outlet } from "@tanstack/react-router";

import Navbar from "@/components/app/nav";

export const Route = createRootRoute({
    component: () => (
        <>
            <Navbar />
            <Outlet />
        </>
    ),
});
