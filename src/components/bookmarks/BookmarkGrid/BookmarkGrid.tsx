import styles from "./BookmarkGrid.module.scss";
import React, { useContext } from "react";
import { BookmarkGroup } from "../BookmarkGroup/BookmarkGroup";
import { GroupContext } from "../../../contexts/GroupContext";
import SortableList from "../../ui/SortableList/SortableList";

export const BookmarkGrid = () => {
    const { groups, reorderGroups } = useContext(GroupContext);

    const handleDragEnd = (sortedGroups: string[]) => {
        reorderGroups(sortedGroups);
    };

    const sortableGroups = groups.map((group) => ({
        id: group,
        item: group,
    }));

    return (
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
            onDragEnd={handleDragEnd}
        />
    );
};
