import * as React from "react";
import { BookmarkLink } from "../BookmarkLink/BookmarkLink";
import styles from "./BookmarkList.module.css";
import {useBookmarkTree} from "../../hooks/useBookmarkTree";

export const BookmarkList = () => {
  const bookmarks = useBookmarkTree("417");

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
