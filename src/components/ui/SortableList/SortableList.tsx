import {
    DragDropContext,
    Draggable,
    DraggableProvidedDragHandleProps,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import styles from "./SortableList.module.scss";
import * as React from "react";

export type SortableItem = {
    id: string;
    item: any;
};

export type DragHandleProps = DraggableProvidedDragHandleProps;

type Props = {
    direction: "vertical" | "horizontal";
    sortableItems: SortableItem[];
    itemContent: (item: any, dragHandle?: DragHandleProps) => React.ReactNode;
    onDragEnd?: (items: any[]) => void;
};

const reorder = (
    sortableItems: SortableItem[],
    startIndex: number,
    endIndex: number
): SortableItem[] => {
    const result = Array.from(sortableItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const SortableList = ({
    direction,
    sortableItems,
    itemContent,
    onDragEnd,
}: Props) => {
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sortedItems = reorder(
            sortableItems,
            result.source.index,
            result.destination.index
        );

        if (onDragEnd) {
            onDragEnd(sortedItems.map(({ item }) => item));
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable" direction={direction}>
                {(provided, snapshot) => (
                    <div
                        className={
                            direction === "horizontal" ? styles.grid : ""
                        }
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {sortableItems.map((sortableItem, index) => (
                            <Draggable
                                key={sortableItem.id}
                                draggableId={sortableItem.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        {itemContent(
                                            sortableItem.item,
                                            provided.dragHandleProps
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SortableList;
