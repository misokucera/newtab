import React, { useContext } from "react";
import { BookmarkGroup } from "./BookmarkGroup";
import { GroupContext } from "../../contexts/GroupContext";
import SortableList from "../ui/SortableList";
import GroupSelectCard from "./GroupSelectCard";

export const BookmarkGrid = () => {
    const { groups, reorderGroups } = useContext(GroupContext);

    const handleDragEnd = (sortedGroups: string[]) => {
        reorderGroups(sortedGroups);
    };

    const sortableGroups = groups.map((group, index) => ({
        id: group,
        item: group,
    }));

    return (
        <div className="text-center">
            <SortableList
                direction="horizontal"
                sortableItems={sortableGroups}
                itemContent={(treeId, dragHandleProps) => (
                    <BookmarkGroup
                        treeId={treeId}
                        key={treeId}
                        dragHandleProps={dragHandleProps}
                    />
                )}
                contentAfter={<GroupSelectCard />}
                onDragEnd={handleDragEnd}
            />
        </div>
    );
};
