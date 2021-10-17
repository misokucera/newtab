import GroupSelectDialog from "../components/bookmarks/GroupSelectDialog";
import { BookmarkGrid } from "../components/bookmarks/BookmarkGrid";
import { GroupProvider } from "../contexts/GroupContext";
import React from "react";

export default function Home() {
    return (
        <GroupProvider>
            <GroupSelectDialog />
            <BookmarkGrid />
        </GroupProvider>
    );
}
