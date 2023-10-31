import { RadioGroup } from "@headlessui/react";
import ThemeOption from "./ThemeOption";
import { useTheme } from "../../contexts/ThemeContext";
import { useSystemDarkTheme } from "../../hooks/useSystemDarkTheme";

const ThemeSwitcher = () => {
    const { theme, changeTheme } = useTheme();
    const isSystemDarkModeActive = useSystemDarkTheme();

    return (
        <RadioGroup value={theme} onChange={changeTheme} className="flex gap-2">
            <ThemeOption value="light" color="light">
                Light
            </ThemeOption>
            <ThemeOption value="dark" color="dark">
                Dark
            </ThemeOption>
            <ThemeOption
                value="system"
                color={isSystemDarkModeActive ? "dark" : "light"}
            >
                System
            </ThemeOption>
        </RadioGroup>
    );
};

export default ThemeSwitcher;
