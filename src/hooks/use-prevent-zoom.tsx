import { useEffect } from "react";

function usePreventZoom(scrollCheck = true, keyboardCheck = true) {
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (
                keyboardCheck &&
                e.ctrlKey &&
                e.metaKey &&
                (e.key === "+" || e.key === "-" || e.key === "=")
            ) {
                e.preventDefault();
            }
        };

        const handleWheel = (e: MouseEvent) => {
            if (scrollCheck && e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("wheel", handleWheel);
        };
    }, [scrollCheck, keyboardCheck]);
}

export default usePreventZoom;
