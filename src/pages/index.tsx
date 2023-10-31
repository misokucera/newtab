import { BookmarkGrid } from "../components/bookmarks/BookmarkGrid";
import ThemeSwitcher from "../components/settings/ThemeSwitcher";
import { GroupProvider } from "../contexts/GroupContext";
import React from "react";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Home() {
    return (
        <ThemeProvider>
            <GroupProvider>
                <div className="flex justify-center py-4">
                    <ThemeSwitcher />
                </div>
                <BookmarkGrid />
            </GroupProvider>
        </ThemeProvider>
    );
}
