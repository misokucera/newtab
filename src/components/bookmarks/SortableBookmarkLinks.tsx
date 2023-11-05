import {
    DndContext,
    DragEndEvent,
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
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

type Props = {
    bookmarks: Bookmark[];
    onReorder: (bookmarks: Bookmark[]) => void;
};

const SortableLinks = ({ bookmarks, onReorder }: Props) => {
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
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            sensors={sensors}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext
                items={bookmarks}
                strategy={verticalListSortingStrategy}
            >
                {bookmarks.map((bookmark) => (
                    <BookmarkLink bookmark={bookmark} key={bookmark.id} />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default SortableLinks;
