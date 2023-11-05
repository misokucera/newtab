import { BookmarkGroup } from "./BookmarkGroup";
import { useGroupContext } from "../../contexts/GroupContext";
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
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
    restrictToParentElement,
    restrictToHorizontalAxis,
} from "@dnd-kit/modifiers";
import GroupSelectCard from "./GroupSelectCard";

const SortableBookmarkGrid = () => {
    const { groups, reorderGroups } = useGroupContext();

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
    };

    return (
        <div className="flex justify-center">
            <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
                sensors={sensors}
                modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
            >
                <SortableContext items={groups}>
                    <div className="inline-flex">
                        {groups.map((groupId) => (
                            <BookmarkGroup treeId={groupId} key={groupId} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <GroupSelectCard />
        </div>
    );
};

export default SortableBookmarkGrid;
