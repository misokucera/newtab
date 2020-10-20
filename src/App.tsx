import React, { useEffect, useState } from "react";
import { BookmarkGrid } from "./components/BookmarkGrid/BookmarkGrid";
import GroupSelectDialog from "./components/ui/GroupSelectDialog/GroupSelectDialog";

function App() {
    const [groupIds, setGroupIds] = useState<string[]>([]);

    useEffect(() => {
        //@ts-ignore
        if (chrome !== undefined && chrome.storage !== undefined) {
            //     @ts-ignore
            chrome.storage.sync.get(["groups"], function (result) {
                console.log("Value currently is ", result.groups);
                setGroupIds(result.groups);
            });
        }
    }, []);

    const handleGroupSelect = (groupId: string) => {
        const newGroupIds = [...groupIds, groupId];
        setGroupIds(newGroupIds);

        console.log(groupId);
        console.log(newGroupIds);

        // @ts-ignore
        if (chrome !== undefined && chrome.storage !== undefined) {
            // @ts-ignore
            chrome.storage.sync.set({ groups: newGroupIds }, function () {
                console.log("Value is set to ", newGroupIds);
            });
        }
    };

    return (
        <div>
            <GroupSelectDialog onSelect={handleGroupSelect} />
            <BookmarkGrid treeIds={groupIds} />
        </div>
    );
}

export default App;
