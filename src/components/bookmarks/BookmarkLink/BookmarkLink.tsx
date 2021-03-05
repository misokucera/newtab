import React from "react";
import { getFaviconUrl } from "../../../services/favicons";
import { Bookmark } from "../../../hooks/useGroup";
import { DragHandleProps } from "../../ui/SortableList/SortableList";

type Props = {
    bookmark: Bookmark;
    dragHandleProps?: DragHandleProps;
};

export const BookmarkLink = ({
    bookmark: { url, title },
    dragHandleProps,
}: Props) => {
    return (
        <a
            href={url}
            className="flex items-center p-1.5 no-underline rounded text-gray-500 hover:bg-gray-100"
            {...dragHandleProps}
        >
            <img
                src={getFaviconUrl(url)}
                alt=""
                className="inline-block mr-4 w-5 h-5 p-0.5 rounded-sm bg-white"
            />
            <p
                className="m-0 text-sm truncate"
                title={title || url}
            >
                {title || url}
            </p>
        </a>
    );
};
