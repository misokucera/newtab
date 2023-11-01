import React, { createContext, useEffect, useState } from "react";
import { useSystemDarkTheme } from "../hooks/useSystemDarkTheme";

export type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
    theme: Theme | null;
    changeTheme: (theme: Theme) => void;
} | null>(null);

type Props = {
    children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<Theme>("system");
    const isSystemDarkModeActive = useSystemDarkTheme();

    useEffect(() => {
        setTheme((localStorage.theme as Theme) || "system");
    }, []);

    useEffect(() => {
        const documentClasses = document.documentElement.classList;

        if (theme === "system") {
            documentClasses.toggle("dark", isSystemDarkModeActive);
        } else {
            documentClasses.toggle("dark", theme === "dark");
        }
    }, [theme, isSystemDarkModeActive]);

    const changeTheme = (theme: Theme) => {
        localStorage.theme = theme !== "system" ? theme : "";
        setTheme(theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = React.useContext(ThemeContext);

    if (context === null) {
        throw new Error("Hook useTheme must be used within a ThemeProvider");
    }

    return context;
};
