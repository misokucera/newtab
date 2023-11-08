import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { Bookmark } from "../../hooks/useGroup";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BookmarkLink } from "./BookmarkLink";
import { useState } from "react";
import { MdDragHandle } from "react-icons/md";

type Props = {
    bookmarks: Bookmark[];
    onReorder: (bookmarks: Bookmark[]) => void;
};

const SortableLinks = ({ bookmarks, onReorder }: Props) => {
    const [draggedItem, setDraggedItem] = useState<Bookmark | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const oldIndex = bookmarks.findIndex(({ id }) => id === active.id);

        const newIndex = bookmarks.findIndex(({ id }) => id === over?.id);

        const reorderedBookmarks = arrayMove(bookmarks, oldIndex, newIndex);

        onReorder(reorderedBookmarks);
        setDraggedItem(null);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const draggedBookmark = bookmarks.find(
            ({ id }) => id === event.active.id,
        );

        if (draggedBookmark) {
            setDraggedItem(draggedBookmark);
        }
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            collisionDetection={closestCenter}
            sensors={sensors}
        >
            <SortableContext
                items={bookmarks}
                strategy={verticalListSortingStrategy}
            >
                {bookmarks.map((bookmark) => (
                    <BookmarkLink bookmark={bookmark} key={bookmark.id} />
                ))}
            </SortableContext>
            <DragOverlay>
                {draggedItem ? (
                    <div className="flex gap-3 rounded bg-gray-200 p-1.5 text-sm text-gray-500">
                        <MdDragHandle size="20" className="shrink-0" />
                        <div className="truncate">
                            {draggedItem.title || draggedItem.url}
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default SortableLinks;
