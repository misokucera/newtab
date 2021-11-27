import * as React from "react";
import { BookmarkLink } from "./BookmarkLink";
import { Bookmark, useGroup } from "../../hooks/useGroup";
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../contexts/GroupContext";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SortableList, {
    DragHandleProps,
    SortableItem,
} from "../ui/SortableList";
import Card from "../ui/Card";
import Title from "../ui/Title";
import { Transition } from "@headlessui/react";

type Props = {
    treeId: string;
    dragHandleProps?: DragHandleProps;
};

export const BookmarkGroup = ({ treeId, dragHandleProps }: Props) => {
    const { bookmarks, title, reorderBookmarks } = useGroup(treeId);
    const { removeGroup } = useContext(GroupContext);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 150);
    }, []);

    const handleRemove = () => {
        setShow(false);
    };

    const onDragEnd = (sortedItems: Bookmark[]) => {
        reorderBookmarks(
            sortedItems.map((item, index) => ({
                ...item,
                index,
            }))
        );
    };

    const sortableBookmarks: SortableItem[] = bookmarks.map((bookmark) => ({
        id: bookmark.id,
        item: bookmark,
    }));

    return (
        <Transition
            appear={true}
            show={show}
            enter="transition-all transform-gpu origin-top duration-150"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition-all transform-gpu origin-top duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            afterLeave={() => removeGroup(treeId)}
        >
            <Card className="group">
                <div
                    className="flex items-center justify-between mb-2"
                    {...dragHandleProps}
                >
                    <Title className="truncate">{title}</Title>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <IconButton aria-label="delete" onClick={handleRemove}>
                            <CloseIcon fontSize="small" />
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
        </Transition>
    );
};
