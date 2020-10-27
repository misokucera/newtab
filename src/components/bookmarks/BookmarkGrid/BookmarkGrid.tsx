import styles from "./BookmarkGrid.module.scss";
import React, { useContext } from "react";
import { BookmarkGroup } from "../BookmarkGroup/BookmarkGroup";
import { GroupContext } from "../../../contexts/GroupContext";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";

const reorder = (
    list: string[],
    startIndex: number,
    endIndex: number
): string[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const BookmarkGrid = () => {
    const { groups, reorderGroups } = useContext(GroupContext);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const orderedGroups = reorder(
            groups,
            result.source.index,
            result.destination.index
        );

        reorderGroups(orderedGroups);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        className={styles.grid}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {groups.map((treeId, index) => (
                            <Draggable
                                key={treeId}
                                draggableId={treeId}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <BookmarkGroup
                                            treeId={treeId}
                                            key={treeId}
                                        />
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
