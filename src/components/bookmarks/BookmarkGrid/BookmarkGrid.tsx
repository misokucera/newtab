import styles from "./BookmarkGrid.module.scss";
import React, { useContext } from "react";
import { BookmarkGroup } from "../BookmarkGroup/BookmarkGroup";
import { GroupContext } from "../../../contexts/GroupContext";
import SortableList from "../../ui/SortableList/SortableList";

const reorder = (
    list: string[],
    startIndex: number,
    endIndex: number
): string[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

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
            itemContent={(treeId) => <BookmarkGroup treeId={treeId} key={treeId} />}
            onDragEnd={handleDragEnd}
        />
    );
};
