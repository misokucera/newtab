import { Bookmark, useGroup } from "../../hooks/useGroup";
import { useState } from "react";
import { useGroupContext } from "../../contexts/GroupContext";
import { MdClose } from "react-icons/md";
import Card from "../ui/Card";
import Title from "../ui/Title";
import IconButton from "../ui/IconButton";
import FadeAndScaleTransition from "../ui/transitions/FadeAndScaleTransition";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import SortableLinks from "./SortableBookmarkLinks";

type Props = {
    treeId: string;
};

export const BookmarkGroup = ({ treeId }: Props) => {
    const { bookmarks, title, reorderBookmarks } = useGroup(treeId);
    const { removeGroup } = useGroupContext();
    const [show, setShow] = useState(true);

    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id: treeId });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const handleRemove = () => {
        setShow(false);
    };

    const handleBookmarkSort = (sortedItems: Bookmark[]) => {
        reorderBookmarks(
            sortedItems.map((item, index) => ({
                ...item,
                index,
            })),
        );
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={classNames("flex", {
                "opacity-70": isDragging,
            })}
        >
            <FadeAndScaleTransition
                show={show}
                afterLeave={() => removeGroup(treeId)}
            >
                <Card className="group">
                    <div className="mb-2 flex items-center">
                        <div
                            className={classNames("flex-1", {
                                "cursor-grab": !isDragging,
                                "cursor-grabbing": isDragging,
                            })}
                            {...attributes}
                            {...listeners}
                            ref={setActivatorNodeRef}
                        >
                            <Title className="truncate">{title}</Title>
                        </div>
                        <div className="shrink-0 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                            <IconButton onClick={handleRemove}>
                                <MdClose size={20} />
                            </IconButton>
                        </div>
                    </div>
                    <SortableLinks
                        bookmarks={bookmarks}
                        onReorder={handleBookmarkSort}
                    />
                </Card>
            </FadeAndScaleTransition>
        </div>
    );
};
