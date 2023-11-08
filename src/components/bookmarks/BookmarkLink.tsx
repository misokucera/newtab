import { useState } from "react";
import { getFaviconUrl } from "../../services/favicons";
import { Bookmark } from "../../hooks/useGroup";
import { MdClose, MdDragHandle } from "react-icons/md";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import AlertDialog from "../ui/AlertDialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

type Props = {
    bookmark: Bookmark;
};

export const BookmarkLink = ({ bookmark: { id, url, title } }: Props) => {
    const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState(false);

    const {
        active,
        isDragging,
        listeners,
        attributes,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

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
        <div
            ref={setNodeRef}
            style={style}
            className={classNames(
                "group/link rounded text-gray-500 focus-within:bg-gray-100 hover:bg-gray-100 dark:text-gray-400 dark:focus-within:bg-slate-600 dark:hover:bg-slate-600",
                {
                    "pointer-events-none": isDragging || active,
                    "bg-gray-100 opacity-60": isDragging,
                },
            )}
        >
            <div className="flex items-center">
                <button
                    {...listeners}
                    {...attributes}
                    ref={setActivatorNodeRef}
                    className="hidden rounded rounded-br-none rounded-tr-none border-0 bg-transparent p-1.5 transition hover:bg-gray-200 group-hover/link:flex dark:hover:bg-slate-800"
                >
                    <MdDragHandle size="20" />
                </button>
                <img
                    src={getFaviconUrl(url)}
                    alt=""
                    className="m-1.5 block inline-block h-5 w-5 rounded-sm bg-white p-0.5 group-hover/link:hidden dark:bg-slate-700"
                />
                <a
                    href={url}
                    className="flex flex-1 items-center overflow-x-hidden p-1.5 no-underline"
                >
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
