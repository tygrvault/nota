import { Button } from "../ui/button";

export default function SubNavBar() {
    return (
        <>
            <div className="flex flex-col w-56 h-screen px-2 py-4 border-r border-black/10 dark:border-white/10">
                <Button variant="secondary">Note 1</Button>
            </div>
        </>
    );
}
