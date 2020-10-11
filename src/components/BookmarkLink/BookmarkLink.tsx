import React from "react";
import { getFaviconUrl } from "../../services/favicons";
import styles from "./BookmarkLink.module.css";
import { Bookmark } from "../../hooks/useBookmarkTree";

type Props = {
  bookmark: Bookmark;
};

export const BookmarkLink = ({ bookmark: { url, title } }: Props) => {
  return (
    <a href={url} className={styles.link} title={url}>
      <img src={getFaviconUrl(url)} alt="" className={styles.favicon} />
      <div className={styles.text}>{title}</div>
    </a>
  );
};
