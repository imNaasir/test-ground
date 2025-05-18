import { useEffect, useRef } from "react";

const INACTIVITY_TIMEOUT = 1 * 60 * 1000; // 2 minutes in milliseconds

const useInactivityTimer = (onInactive: () => void) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            onInactive();
        }, INACTIVITY_TIMEOUT);
    };

    const resetTimer = () => {
        startTimer();
    };

    useEffect(() => {
        startTimer();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return { resetTimer };
};

export default useInactivityTimer;
