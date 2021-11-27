import * as React from "react";
import { BookmarkLink } from "./BookmarkLink";
import { Bookmark, useGroup } from "../../hooks/useGroup";
import { useContext } from "react";
import { GroupContext } from "../../contexts/GroupContext";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SortableList, { DragHandleProps, SortableItem } from "../ui/SortableList";
import Card from "../ui/Card";
import Title from "../ui/Title";

type Props = {
    treeId: string;
    dragHandleProps?: DragHandleProps;
};

export const BookmarkGroup = ({ treeId, dragHandleProps }: Props) => {
    const { bookmarks, title, reorderBookmarks } = useGroup(treeId);
    const { removeGroup } = useContext(GroupContext);

    const handleRemove = () => {
        removeGroup(treeId);
    };

    const onDragEnd = (sortedItems: Bookmark[]) => {
        reorderBookmarks(sortedItems.map((item, index) => ({
            ...item,
            index
        })));
    };

    const sortableBookmarks: SortableItem[] = bookmarks.map((bookmark) => ({
        id: bookmark.id,
        item: bookmark,
    }));

    return (
        <Card className="group">
            <div
                className="flex items-center justify-between mb-2"
                {...dragHandleProps}
            >
                <Title className="truncate">{title}</Title>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton
                        aria-label="delete"
                        onClick={handleRemove}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <div>
                <SortableList
                    direction="vertical"
                    sortableItems={sortableBookmarks}
                    itemContent={(bookmark, dragHandleProps) => (
                        <BookmarkLink
                            bookmark={bookmark}
                            key={bookmark.id}
                            dragHandleProps={dragHandleProps}
                        />
                    )}
                    onDragEnd={onDragEnd}
                />
            </div>
        </Card>
    );
};
