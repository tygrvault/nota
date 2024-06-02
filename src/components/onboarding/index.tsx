import { createContext, useContext, useState } from "react";

export interface OnboardingContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType>({
    step: 0,
    nextStep: () => {},
    prevStep: () => {},
});

// Screens
import Welcome from "@/components/onboarding/welcome";
import CreateVault from "./create-vault";

const Onboarding = () => {
    const [step, setStep] = useState(0);

    // NOTE: all onboarding screens here
    const screens = [<Welcome />, <CreateVault />];

    function nextStep() {
        setStep(step < screens.length ? step + 1 : step);
    }

    function prevStep() {
        setStep(step > 0 ? step - 1 : step);
    }

    return (
        <OnboardingContext.Provider
            value={{
                step,
                nextStep,
                prevStep,
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
