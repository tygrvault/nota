import { useOnboarding } from "@/components/onboarding";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export default function Welcome() {
    const { nextStep } = useOnboarding();

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen gap-8">
                <Icons.logo className="w-32 h-32" />
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-4xl font-bold">Welcome to Nota!</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Notes for the modern era.
                    </p>
                </div>
                <Button onClick={() => nextStep()}>Get Started</Button>
            </div>
        </>
    );
}
