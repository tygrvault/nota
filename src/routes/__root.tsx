import { createRootRoute, Outlet } from "@tanstack/react-router";

import Navbar from "@/components/app/nav";
import SubNavBar from "@/components/app/sub-nav";

export const Route = createRootRoute({
    component: () => (
        <>
            <Navbar />
            <SubNavBar />
            <Outlet />
        </>
    ),
});
