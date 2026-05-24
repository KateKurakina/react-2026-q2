import { createContext, useContext, useState, type ReactNode} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
    children: ReactNode;
};

export function ThemeProvider({ children }:Props) {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error ("useTheme must be used inside ThemeProvider");
    }

    return context;
}

