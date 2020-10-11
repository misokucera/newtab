import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import styles from "./BookmarkList.module.scss";
import { useBookmarkTree } from "../../hooks/useBookmarkTree";

type Props = {
  treeId: string;
};

export const BookmarkList = ({ treeId }: Props) => {
  const bookmarks = useBookmarkTree(treeId);

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>Záložky</h2>
      <div>
        {bookmarks.map((bookmark) => (
          <BookmarkLink bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
};
