import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import styles from "./BookmarkGroup.module.scss";
import { Bookmark, useGroup } from "../../../hooks/useGroup";
import { useContext, useState } from "react";
import { GroupContext } from "../../../contexts/GroupContext";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AlertDialog } from "../../ui/AlertDialog/AlertDialog";
import SortableList, { SortableItem } from "../../ui/SortableList/SortableList";

type Props = {
    treeId: string;
};

export const BookmarkGroup = ({ treeId }: Props) => {
    const { bookmarks, title } = useGroup(treeId);
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

    const onDragEnd = (sortedItems: Bookmark[]) => {};

    const sortableBookmarks: SortableItem[] = bookmarks.map((bookmark) => ({
        id: bookmark.id,
        item: bookmark,
    }));

    return (
        <div className={styles.list}>
            <div className={styles.header}>
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
                    itemContent={(bookmark) => (
                        <BookmarkLink bookmark={bookmark} key={bookmark.id} />
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
