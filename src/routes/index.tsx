import PlateEditor from "@/components/app/editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="flex flex-col items-center w-full h-screen gap-6">
            <div className="flex flex-col flex-1 w-full">
                <PlateEditor />
            </div>
        </div>
    );
}
