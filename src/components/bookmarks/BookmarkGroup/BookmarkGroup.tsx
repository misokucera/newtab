import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import { Bookmark, useGroup } from "../../../hooks/useGroup";
import { useContext, useState } from "react";
import { GroupContext } from "../../../contexts/GroupContext";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AlertDialog } from "../../ui/AlertDialog/AlertDialog";
import SortableList, { DragHandleProps, SortableItem } from "../../ui/SortableList/SortableList";

type Props = {
    treeId: string;
    dragHandleProps?: DragHandleProps;
};

export const BookmarkGroup = ({ treeId, dragHandleProps }: Props) => {
    const { bookmarks, title, reorderBookmarks } = useGroup(treeId);
    const { removeGroup } = useContext(GroupContext);
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

    const handleOpenRemoveDialog = () => {
        setOpenRemoveDialog(true);
    };

    const handleCloseRemoveDialog = () => {
        setOpenRemoveDialog(false);
    };

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
        <div className="group m-2 p-3 max-w-xs rounded bg-white">
            <div className="flex items-center justify-between mb-2" {...dragHandleProps}>
                <h2 className="p-3 my-0 uppercase text-sm font-normal text-gray-400 truncate">{title}</h2>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton
                        aria-label="delete"
                        onClick={handleOpenRemoveDialog}
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
                        <BookmarkLink bookmark={bookmark} key={bookmark.id} dragHandleProps={dragHandleProps} />
                    )}
                    onDragEnd={onDragEnd}
                />
            </div>
            <AlertDialog
                open={openRemoveDialog}
                onContinue={handleRemove}
                onCancel={handleCloseRemoveDialog}
                title="Remove this group?"
                text="Once group is removed, it could be always added again."
            />
        </div>
    );
};
