import PlateEditor from "@/components/app/editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
	return (
			 <div className="relative flex flex-col min-h-screen">
			<div className="flex-1">
				
        <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
            <div className="max-w-[1336px] rounded-lg border bg-background shadow">
                <PlateEditor />
            </div>
        </section>
			</div>
			</div>
    );
}
