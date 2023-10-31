import { useSyncExternalStore } from "react";

const subscribe = (onStoreChange: () => void) => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQueryList.addEventListener("change", onStoreChange);

    return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
    };
};

export const useSystemDarkTheme = () => {
    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia("(prefers-color-scheme: dark)").matches,
        () => false,
    );
};
