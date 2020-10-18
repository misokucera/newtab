import React from "react";
import { getFaviconUrl } from "../../services/favicons";
import styles from "./BookmarkLink.module.scss";
import { Bookmark } from "../../hooks/useBookmarks";

type Props = {
    bookmark: Bookmark;
};

export const BookmarkLink = ({ bookmark: { url, title } }: Props) => {
    return (
        <a href={url} className={styles.link}>
            <img src={getFaviconUrl(url)} alt="" className={styles.favicon} />
            <div className={styles.text}>
                {title && (
                    <p className={styles.title} title={title}>
                        {title}
                    </p>
                )}
                <p className={styles.url} title={url}>
                    {url}
                </p>
            </div>
        </a>
    );
};
