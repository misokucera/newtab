import { MdDragHandle } from "react-icons/md";
import { Bookmark } from "../../hooks/useGroup";

type Props = {
    bookmark: Bookmark;
};

const BookmarkLinkOverlay = ({ bookmark }: Props) => {
    return (
        <div className="flex cursor-grabbing gap-3 rounded bg-white p-1.5 text-sm text-gray-500 shadow-lg dark:bg-slate-800 dark:text-gray-400">
            <MdDragHandle size="20" className="shrink-0" />
            <div className="truncate">{bookmark.title || bookmark.url}</div>
        </div>
    );
};

export default BookmarkLinkOverlay;
