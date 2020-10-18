import React, { useState } from "react";
import { BookmarkGrid } from "./components/BookmarkGrid/BookmarkGrid";
import GroupSelectDialog from "./components/ui/GroupSelectDialog/GroupSelectDialog";

function App() {
    const [groupIds, setGroupIds] = useState<string[]>([]);

    const handleGroupSelect = (groupId: string) => {
        setGroupIds([...groupIds, groupId]);
    };

    return (
        <div>
            <GroupSelectDialog onSelect={handleGroupSelect} />
            <BookmarkGrid treeIds={groupIds} />
        </div>
    );
}

export default App;
