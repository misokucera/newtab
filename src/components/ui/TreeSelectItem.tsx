import React, { useState } from "react";
import {
    MdExpandMore as ExpandMoreIcon,
    MdChevronRight as ChevronRightIcon,
} from "react-icons/md";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { TreeNode } from "../../hooks/useGroups";

type Props = {
    treeNode: TreeNode;
    selectedNodeId: string | null;
    disabledNodes: string[];
    onSelect?: (node: TreeNode) => void;
};

const TreeSelectItem = ({
    treeNode,
    onSelect,
    disabledNodes,
    selectedNodeId,
}: Props) => {
    const [isShowing, setIsShowing] = useState(false);

    const childrenNodes = treeNode.children ?? [];
    const hasChildren = childrenNodes.length > 0;

    const isSelected = treeNode.id === selectedNodeId;
    const isDisabled = disabledNodes.includes(treeNode.id);

    const handleSelect = () => {
        setIsShowing((isShowing) => !isShowing);

        if (onSelect && !isDisabled) {
            onSelect(treeNode);
        }
    };

    return (
        <div className="relative pl-5">
            <button
                className={classNames(
                    "mb-0.5 max-w-full rounded px-1.5 py-0.5",
                    {
                        "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-sky-700 dark:text-sky-200 dark:hover:bg-sky-600":
                            isSelected,
                        "hover:bg-gray-100 dark:hover:bg-slate-600":
                            !isSelected && (!isDisabled || hasChildren),
                        "text-gray-600 dark:text-gray-300": !isSelected,
                    },
                )}
                onClick={handleSelect}
            >
                {hasChildren && (
                    <div className="absolute left-0">
                        {isShowing ? (
                            <ExpandMoreIcon fontSize="18" />
                        ) : (
                            <ChevronRightIcon fontSize="18" />
                        )}
                    </div>
                )}
                <div
                    className={classNames("flex items-center gap-1", {
                        "opacity-50": isDisabled,
                    })}
                >
                    <div className="flex-1 truncate">{treeNode.label}</div>
                    <div>({isDisabled ? "active" : treeNode.linkCount})</div>
                </div>
            </button>

            {hasChildren && (
                <Transition show={isShowing}>
                    {childrenNodes.map((node) => (
                        <TreeSelectItem
                            key={node.id}
                            treeNode={node}
                            selectedNodeId={selectedNodeId}
                            disabledNodes={disabledNodes}
                            onSelect={onSelect}
                        />
                    ))}
                </Transition>
            )}
        </div>
    );
};

export default TreeSelectItem;
