import { useEffect } from "react";

export default function usePreventContext() {
    useEffect(() => {
        const handleContextMenu = (e: any) => {
            e.preventDefault();
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });
}
