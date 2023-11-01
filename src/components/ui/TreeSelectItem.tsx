import React, { useState } from "react";
import { TreeNode } from "./TreeSelect";
import {
    MdExpandMore as ExpandMoreIcon,
    MdChevronRight as ChevronRightIcon,
} from "react-icons/md";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

type Props = {
    treeNode: TreeNode;
    selectedIds: string[];
    onSelect?: (node: TreeNode) => void;
};

const TreeSelectItem = ({ treeNode, onSelect, selectedIds }: Props) => {
    const [isShowing, setIsShowing] = useState(false);

    const childrenNodes = treeNode.children ?? [];

    const handleSelect = () => {
        setIsShowing((isShowing) => !isShowing);

        if (onSelect) {
            onSelect(treeNode);
        }
    };

    const isSelected = selectedIds.includes(treeNode.id);

    return (
        <div className="relative pl-5">
            <button
                className={classNames("mb-0.5 rounded px-1.5 py-0.5", {
                    "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-sky-700 dark:text-sky-200 dark:hover:bg-sky-600":
                        isSelected,
                    "hover:bg-gray-100 dark:hover:bg-slate-600 dark:hover:text-gray-300":
                        !isSelected,
                })}
                onClick={handleSelect}
            >
                {childrenNodes.length > 0 && (
                    <div className="absolute left-0">
                        {isShowing ? (
                            <ExpandMoreIcon fontSize="18" />
                        ) : (
                            <ChevronRightIcon fontSize="18" />
                        )}
                    </div>
                )}
                {treeNode.label}
            </button>
            {childrenNodes.length > 0 && (
                <Transition show={isShowing}>
                    {childrenNodes.map((node) => (
                        <TreeSelectItem
                            key={node.id}
                            treeNode={node}
                            selectedIds={selectedIds}
                            onSelect={onSelect}
                        />
                    ))}
                </Transition>
            )}
        </div>
    );
};

export default TreeSelectItem;
