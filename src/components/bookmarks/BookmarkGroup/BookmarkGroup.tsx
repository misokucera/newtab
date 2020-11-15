import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import styles from "./BookmarkGroup.module.scss";
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
        <div className={styles.list}>
            <div className={styles.header} {...dragHandleProps}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.actions}>
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
