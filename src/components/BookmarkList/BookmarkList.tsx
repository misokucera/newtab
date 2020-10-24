import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import styles from "./BookmarkList.module.scss";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useContext } from "react";
import { GroupContext } from "../../contexts/GroupContext";

type Props = {
    treeId: string;
};

export const BookmarkList = ({ treeId }: Props) => {
    const bookmarks = useBookmarks(treeId);
    const { removeGroup } = useContext(GroupContext);

    const handleRemove = () => {
        removeGroup(treeId);
    };

    return (
        <div className={styles.list}>
            <h2 className={styles.title}>Záložky</h2>
            <button onClick={handleRemove}>X</button>
            <div>
                {bookmarks.map((bookmark) => (
                    <BookmarkLink bookmark={bookmark} key={bookmark.id} />
                ))}
            </div>
        </div>
    );
};
