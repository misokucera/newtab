import React, { useState } from "react";
import { TreeNode } from "./TreeSelect";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
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
        <div className="pl-5 relative">
            <button
                className={classNames("px-1.5 py-0.5 mb-0.5 rounded", {
                    "text-blue-900 bg-blue-100 hover:bg-blue-200": isSelected,
                    "hover:bg-gray-100": !isSelected,
                })}
                onClick={handleSelect}
            >
                {childrenNodes.length > 0 && (
                    <div className="absolute left-0">
                        {isShowing ? (
                            <ExpandMoreIcon fontSize="small" />
                        ) : (
                            <ChevronRightIcon fontSize="small" />
                        )}
                    </div>
                )}
                {treeNode.label}
            </button>
            {childrenNodes.length > 0 && (
                <Transition show={isShowing}>
                    {childrenNodes.map((node) => (
                        <TreeSelectItem
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
