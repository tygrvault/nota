import { useEffect } from "react";

export default function Context() {
    useEffect(() => {
        const handleContextMenu = (e: any) => {
            e.preventDefault();
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });

    return <>{/* TODO: Add custom context menu */}</>;
}
