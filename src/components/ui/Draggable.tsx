import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import classNames from "classnames";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";

type Props = {
    id: UniqueIdentifier;
    children: React.ReactNode;
    className?: string;
};

const Draggable = ({ id, className = "", children }: Props) => {
    const { isDragging, setNodeRef, transform, transition } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={classNames({
                [twMerge(
                    "rounded-lg bg-gray-200 dark:bg-slate-600",
                    className,
                )]: isDragging,
            })}
        >
            <div
                className={classNames("overflow-x-hidden", {
                    "pointer-events-none invisible": isDragging,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default Draggable;
