import React from "react";
import SortableBookmarkGrid from "../components/bookmarks/SortableBookmarkGrid";
import ThemeSwitcher from "../components/settings/ThemeSwitcher";
import { GroupProvider } from "../contexts/GroupContext";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Home() {
    return (
        <ThemeProvider>
            <GroupProvider>
                <div className="flex justify-center py-4">
                    <ThemeSwitcher />
                </div>
                <SortableBookmarkGrid />
            </GroupProvider>
        </ThemeProvider>
    );
}
