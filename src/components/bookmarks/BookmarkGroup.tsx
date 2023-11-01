import { BookmarkLink } from "./BookmarkLink";
import { Bookmark, useGroup } from "../../hooks/useGroup";
import { useState } from "react";
import { useGroupContext } from "../../contexts/GroupContext";
import { MdClose } from "react-icons/md";
import SortableList, {
    DragHandleProps,
    SortableItem,
} from "../ui/SortableList";
import Card from "../ui/Card";
import Title from "../ui/Title";
import IconButton from "../ui/IconButton";
import FadeAndScaleTransition from "../ui/transitions/FadeAndScaleTransition";

type Props = {
    treeId: string;
    dragHandleProps?: DragHandleProps | null;
};

export const BookmarkGroup = ({ treeId, dragHandleProps }: Props) => {
    const { bookmarks, title, reorderBookmarks } = useGroup(treeId);
    const { removeGroup } = useGroupContext();
    const [show, setShow] = useState(true);

    const handleRemove = () => {
        setShow(false);
    };

    const onDragEnd = (sortedItems: Bookmark[]) => {
        reorderBookmarks(
            sortedItems.map((item, index) => ({
                ...item,
                index,
            })),
        );
    };

    const sortableBookmarks: SortableItem[] = bookmarks.map((bookmark) => ({
        id: bookmark.id,
        item: bookmark,
    }));

    return (
        <FadeAndScaleTransition
            show={show}
            afterLeave={() => removeGroup(treeId)}
        >
            <Card className="group">
                <div
                    className="mb-2 flex items-center justify-between"
                    {...dragHandleProps}
                >
                    <Title className="truncate">{title}</Title>
                    <div className="opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                        <IconButton onClick={handleRemove}>
                            <MdClose size={20} />
                        </IconButton>
                    </div>
                </div>
                <div>
                    <SortableList
                        direction="vertical"
                        sortableItems={sortableBookmarks}
                        itemContent={(bookmark, dragHandleProps) => (
                            <BookmarkLink
                                bookmark={bookmark}
                                key={bookmark.id}
                                dragHandleProps={dragHandleProps}
                            />
                        )}
                        onDragEnd={onDragEnd}
                    />
                </div>
            </Card>
        </FadeAndScaleTransition>
    );
};
