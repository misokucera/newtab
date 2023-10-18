import {
    DragDropContext,
    Draggable,
    DraggableProvidedDragHandleProps,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import * as React from "react";
import cn from "classnames";

export type SortableItem = {
    id: string;
    item: any;
};

export type DragHandleProps = DraggableProvidedDragHandleProps;

type Props = {
    direction: "vertical" | "horizontal";
    sortableItems: SortableItem[];
    contentBefore?: React.ReactNode;
    contentAfter?: React.ReactNode;
    itemContent: (
        item: any,
        dragHandle?: DragHandleProps | null,
    ) => React.ReactNode;
    onDragEnd?: (items: any[]) => void;
};

const reorder = (
    sortableItems: SortableItem[],
    startIndex: number,
    endIndex: number,
): SortableItem[] => {
    const result = Array.from(sortableItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const SortableList = ({
    direction,
    sortableItems,
    contentBefore,
    contentAfter,
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
            result.destination.index,
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
                        className={cn(
                            {
                                "inline-flex": direction === "horizontal",
                            },
                            "items-start",
                        )}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {contentBefore}
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
                                            provided.dragHandleProps,
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        {contentAfter}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SortableList;
