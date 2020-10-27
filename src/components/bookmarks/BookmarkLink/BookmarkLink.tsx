import React from "react";
import { getFaviconUrl } from "../../../services/favicons";
import styles from "./BookmarkLink.module.scss";
import { Bookmark } from "../../../hooks/useGroup";

type Props = {
    bookmark: Bookmark;
};

export const BookmarkLink = ({ bookmark: { url, title } }: Props) => {
    return (
        <a href={url} className={styles.link}>
            <img src={getFaviconUrl(url)} alt="" className={styles.favicon} />
            <p className={styles.title} title={title || url}>
                {title || url}
            </p>
        </a>
    );
};
