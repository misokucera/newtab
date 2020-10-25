import styles from "./BookmarkGrid.module.scss";
import React, { useContext } from "react";
import { BookmarkGroup } from "../BookmarkList/BookmarkGroup";
import { GroupContext } from "../../contexts/GroupContext";

export const BookmarkGrid = () => {
    const { groups } = useContext(GroupContext);

    return (
        <div className={styles.grid}>
            {groups.map((treeId) => (
                <BookmarkGroup treeId={treeId} key={treeId} />
            ))}
        </div>
    );
};
