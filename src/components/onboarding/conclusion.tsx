import { useOnboarding } from ".";
import { Button } from "../ui/button";

export default function Conclusion() {
    const { finish } = useOnboarding();

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen gap-8">
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-4xl font-bold">Nota is ready!</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Nota is ready for use.
                    </p>
                </div>
                <Button onClick={async () => await finish()}>Let me in!</Button>
            </div>
        </>
    );
}
