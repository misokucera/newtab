import React from "react";
import TreeSelectItem from "./TreeSelectItem";
import { TreeNode } from "../../hooks/useGroups";

type Props = {
    root: TreeNode;
    selectedNode: TreeNode | null;
    onSelect?: (node: TreeNode) => void;
};

export const TreeSelect = ({ root, selectedNode, onSelect }: Props) => {
    const handleSelect = (node: TreeNode) => {
        if (onSelect) {
            onSelect(node);
        }
    };

    return (
        <>
            {root.children &&
                root.children.length > 0 &&
                root.children.map((node) => (
                    <TreeSelectItem
                        key={node.id}
                        treeNode={node}
                        onSelect={handleSelect}
                        selectedNodeId={selectedNode?.id ?? null}
                    />
                ))}
        </>
    );
};
