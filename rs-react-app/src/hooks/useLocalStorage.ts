import { useState } from "react";

export function useLocalStorage(
    key: string,
    initialValue: string
) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);

        return saved ?? initialValue;
    });

    const saveValue = (newValue: string) => {
        localStorage.setItem(key, newValue);

        setValue(newValue);
    }

    return [value, saveValue] as const;
}