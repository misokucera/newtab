import React, { useState } from "react";
import { getFaviconUrl } from "../../services/favicons";
import { Bookmark } from "../../hooks/useGroup";
import { DragHandleProps } from "../ui/SortableList";
import { MdClose } from "react-icons/md";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import AlertDialog from "../ui/AlertDialog";

type Props = {
    bookmark: Bookmark;
    dragHandleProps?: DragHandleProps | null;
};

export const BookmarkLink = ({
    bookmark: { id, url, title },
    dragHandleProps,
}: Props) => {
    const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState(false);

    const handleOpenRemoveDialog = () => {
        setIsOpenRemoveDialog(true);
    };

    const handleCloseRemoveDialog = () => {
        setIsOpenRemoveDialog(false);
    };

    const handleRemove = () => {
        if (chrome.bookmarks) {
            chrome.bookmarks.remove(id);
        }
        setIsOpenRemoveDialog(false);
    };

    return (
        <div className="group/link rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-600 focus-within:bg-gray-100 dark:focus-within:bg-slate-600">
            <div className="flex items-center">
                <a
                    href={url}
                    className="flex flex-1 p-1.5 items-center overflow-x-hidden no-underline"
                    {...dragHandleProps}
                >
                    <img
                        src={getFaviconUrl(url)}
                        alt=""
                        className="inline-block mr-3 w-5 h-5 p-0.5 rounded-sm bg-white dark:bg-slate-700"
                    />
                    <p
                        className="text-left m-0 text-sm truncate"
                        title={title || url}
                    >
                        {title || url}
                    </p>
                </a>
                <div className="group-hover/link:block group-focus-within/link:block hidden">
                    <DeleteBookmarkButton>
                        <MdClose onClick={handleOpenRemoveDialog} size={20} />
                    </DeleteBookmarkButton>
                </div>
            </div>
            <AlertDialog
                open={isOpenRemoveDialog}
                onContinue={handleRemove}
                onCancel={handleCloseRemoveDialog}
                title="Remove this bookmark?"
                text="Bookmark will be permanently removed from browser."
                continueLabel="Remove"
            />
        </div>
    );
};
