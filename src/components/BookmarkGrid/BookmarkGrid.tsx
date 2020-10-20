import styles from "./BookmarkGrid.module.scss";
import React, {useContext} from "react";
import { BookmarkList } from "../BookmarkList/BookmarkList";

type Props = {
    treeIds: string[];
};

export const BookmarkGrid = ({ treeIds }: Props) => {
    return (
        <div className={styles.grid}>
            {treeIds.map((treeId) => (
                <BookmarkList treeId={treeId} key={treeId} />
            ))}
        </div>
    );
};
