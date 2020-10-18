import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import styles from "./BookmarkList.module.scss";
import { useBookmarks } from "../../hooks/useBookmarks";

type Props = {
    treeId: string;
};

export const BookmarkList = ({ treeId }: Props) => {
    const bookmarks = useBookmarks(treeId);

    return (
        <div className={styles.list}>
            <h2 className={styles.title}>Záložky</h2>
            <div>
                {bookmarks.map((bookmark) => (
                    <BookmarkLink bookmark={bookmark} key={bookmark.id} />
                ))}
            </div>
        </div>
    );
};
