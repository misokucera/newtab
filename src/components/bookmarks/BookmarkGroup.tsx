import { Bookmark, useGroup } from "../../hooks/useGroup";
import { useState } from "react";
import { useGroupContext } from "../../contexts/GroupContext";
import { MdClose } from "react-icons/md";
import Card from "../ui/Card";
import Title from "../ui/Title";
import IconButton from "../ui/IconButton";
import FadeAndScaleTransition from "../ui/transitions/FadeAndScaleTransition";
import SortableLinks from "./SortableBookmarkLinks";
import { useDraggable } from "@dnd-kit/core";

type Props = {
    treeId: string;
};

export const BookmarkGroup = ({ treeId }: Props) => {
    const { bookmarks, title, reorderBookmarks } = useGroup(treeId);
    const { removeGroup } = useGroupContext();
    const [show, setShow] = useState(true);

    const { listeners, attributes, setActivatorNodeRef } = useDraggable({
        id: treeId,
    });

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
        <div>
            <FadeAndScaleTransition
                show={show}
                afterLeave={() => removeGroup(treeId)}
            >
                <Card className="group">
                    <div className="mb-2 flex items-center">
                        <div
                            className="flex-1 cursor-grab"
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
