import styles from "./BookmarkGrid.module.scss";
import React, { useContext } from "react";
import { BookmarkList } from "../BookmarkList/BookmarkList";
import { GroupContext } from "../../contexts/GroupContext";

export const BookmarkGrid = () => {
    const { groups } = useContext(GroupContext);

    return (
        <div className={styles.grid}>
            {groups.map((treeId) => (
                <BookmarkList treeId={treeId} key={treeId} />
            ))}
        </div>
    );
};
