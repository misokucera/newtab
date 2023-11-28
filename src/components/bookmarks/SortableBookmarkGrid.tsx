import { BookmarkGroup } from "./BookmarkGroup";
import { useGroupContext } from "../../contexts/GroupContext";
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
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Draggable from "../ui/Draggable";
import BookmarkGroupOverlay from "./BookmarkGroupOverlay";
import EmptyBookmarkGrid from "./EmptyBookmarkGrid";
import GroupSelectCard from "./GroupSelectCard";

const SortableBookmarkGrid = () => {
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const { groups, reorderGroups } = useGroupContext();
    const [showEmptyGroupGrid, setShowEmptyGroupGrid] = useState(false);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const oldIndex = groups.findIndex((group) => group === active.id);
        const newIndex = groups.findIndex((group) => group === over?.id);

        const reorderedGroups = arrayMove(groups, oldIndex, newIndex);

        reorderGroups(reorderedGroups);
        setDraggedItem(null);
    };

    const handleDragStart = (event: DragStartEvent) => {
        setDraggedItem(event.active.id as string);
    };

    return (
        <div className="inline-flex min-w-full justify-center">
            {groups.length === 0 ? (
                <EmptyBookmarkGrid />
            ) : (
                <>
                    <DndContext
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragStart}
                        collisionDetection={closestCenter}
                        sensors={sensors}
                    >
                        <SortableContext items={groups}>
                            <div className="inline-flex gap-4">
                                {groups.map((groupId) => (
                                    <Draggable id={groupId} key={groupId}>
                                        <BookmarkGroup treeId={groupId} />
                                    </Draggable>
                                ))}
                            </div>
                        </SortableContext>
                        <DragOverlay>
                            {draggedItem ? (
                                <BookmarkGroupOverlay treeId={draggedItem} />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                    <GroupSelectCard />
                </>
            )}
        </div>
    );
};

export default SortableBookmarkGrid;
