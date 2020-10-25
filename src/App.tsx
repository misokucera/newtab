import React from "react";
import { BookmarkGrid } from "./components/bookmarks/BookmarkGrid/BookmarkGrid";
import GroupSelectDialog from "./components/bookmarks/GroupSelectDialog/GroupSelectDialog";
import { GroupProvider } from "./contexts/GroupContext";

function App() {
    return (
        <GroupProvider>
            <GroupSelectDialog />
            <BookmarkGrid />
        </GroupProvider>
    );
}

export default App;
