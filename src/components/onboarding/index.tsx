import { createContext, useContext, useState } from "react";

export interface OnboardingContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    finish: () => Promise<boolean>;
}

export const OnboardingContext = createContext<OnboardingContextType>({
    step: 0,
    nextStep: () => {},
    prevStep: () => {},
    finish: () => Promise.resolve(false),
});

// Screens
import Welcome from "@/components/onboarding/welcome";
import CreateVault from "./create-vault";
import { useSettings } from "@/contexts/settings";
import { toast } from "sonner";
import Conclusion from "./conclusion";

const Onboarding = () => {
    const [step, setStep] = useState(0);
    const { set } = useSettings();

    // NOTE: all onboarding screens here
    const screens = [<Welcome />, <CreateVault />, <Conclusion />];

    function nextStep() {
        setStep(step < screens.length ? step + 1 : step);
    }

    function prevStep() {
        setStep(step > 0 ? step - 1 : step);
    }

    async function finish() {
        const res = await set("onboarding", true, true)
            .then(async () => {
                return true;
            })
            .catch((e) => {
                toast.error("Failed to update settings.", {
                    description: e,
                });
                return false;
            });

        return res;
    }

    return (
        <OnboardingContext.Provider
            value={{
                step,
                nextStep,
                prevStep,
                finish,
            }}
        >
            {screens[step]}
        </OnboardingContext.Provider>
    );
};

export default Onboarding;

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error(
            "useOnboarding must be used within a OnboardingProvider"
        );
    }
    return context;
};
