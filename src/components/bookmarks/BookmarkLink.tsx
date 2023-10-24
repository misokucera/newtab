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
        <div className="group/link rounded text-gray-500 focus-within:bg-gray-100 hover:bg-gray-100 dark:text-gray-400 dark:focus-within:bg-slate-600 dark:hover:bg-slate-600">
            <div className="flex items-center">
                <a
                    href={url}
                    className="flex flex-1 items-center overflow-x-hidden p-1.5 no-underline"
                    {...dragHandleProps}
                >
                    <img
                        src={getFaviconUrl(url)}
                        alt=""
                        className="mr-3 inline-block h-5 w-5 rounded-sm bg-white p-0.5 dark:bg-slate-700"
                    />
                    <p
                        className="m-0 truncate text-left text-sm"
                        title={title || url}
                    >
                        {title || url}
                    </p>
                </a>
                <div className="hidden group-focus-within/link:block group-hover/link:block">
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
