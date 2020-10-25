import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import styles from "./BookmarkGroup.module.scss";
import { useBookmarks } from "../../../hooks/useBookmarks";
import { useContext, useState } from "react";
import { GroupContext } from "../../../contexts/GroupContext";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AlertDialog } from "../../ui/AlertDialog/AlertDialog";

type Props = {
    treeId: string;
};

export const BookmarkGroup = ({ treeId }: Props) => {
    const { bookmarks, title } = useBookmarks(treeId);
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

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.actions}>
                    <IconButton
                        aria-label="delete"
                        onClick={handleOpenRemoveDialog}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <div>
                {bookmarks.map((bookmark) => (
                    <BookmarkLink bookmark={bookmark} key={bookmark.id} />
                ))}
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
