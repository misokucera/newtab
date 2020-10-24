import React, { useEffect, useState } from "react";
import { BookmarkGrid } from "./components/BookmarkGrid/BookmarkGrid";
import GroupSelectDialog from "./components/ui/GroupSelectDialog/GroupSelectDialog";
import { GroupProvider } from "./contexts/GroupContext";
import { isDev } from "./services/environment";

function App() {
    // const [groupIds, setGroupIds] = useState<string[]>([]);

    // useEffect(() => {
    //     if (!isDev()) {
    //         chrome.storage.sync.get(["groups"], function (result) {
    //             console.log("Value currently is ", result.groups);
    //             setGroupIds(result.groups);
    //         });
    //     }
    // }, []);
    //
    // const handleGroupSelect = (groupId: string) => {
    //     const newGroupIds = [...groupIds, groupId];
    //     setGroupIds(newGroupIds);
    //
    //     if (!isDev()) {
    //         chrome.storage.sync.set({ groups: newGroupIds }, function () {
    //             console.log("Value is set to ", newGroupIds);
    //         });
    //     }
    // };

    return (
        <GroupProvider>
            <GroupSelectDialog />
            <BookmarkGrid />
        </GroupProvider>
    );
}

export default App;
