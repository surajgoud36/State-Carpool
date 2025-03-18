import { useState, useEffect } from "react";

export function usePersistedState(key, initialValue) {
    const ROLE_KEY = "ROLE_KEY";

    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if(storedValue) {
            return JSON.parse(storedValue);
        }
        else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState, ROLE_KEY];
}