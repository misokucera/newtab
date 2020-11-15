import React from "react";
import { getFaviconUrl } from "../../../services/favicons";
import styles from "./BookmarkLink.module.scss";
import { Bookmark } from "../../../hooks/useGroup";
import { DragHandleProps } from "../../ui/SortableList/SortableList";

type Props = {
    bookmark: Bookmark;
    dragHandleProps?: DragHandleProps;
};

export const BookmarkLink = ({ bookmark: { url, title }, dragHandleProps }: Props) => {
    return (
        <a href={url} className={styles.link} {...dragHandleProps}>
            <img src={getFaviconUrl(url)} alt="" className={styles.favicon} />
            <p className={styles.title} title={title || url}>
                {title || url}
            </p>
        </a>
    );
};
