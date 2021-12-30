import React, { useState } from "react";
import TreeSelectItem from "./TreeSelectItem";

export type TreeNode = {
    id: string;
    label: string;
    children?: TreeNode[];
};

type Props = {
    root: TreeNode;
    onSelect?: (node: TreeNode) => void;
};

export const TreeSelect = ({ root, onSelect }: Props) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelect = (node: TreeNode) => {
        setSelectedIds([node.id]);

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
                        treeNode={node}
                        onSelect={handleSelect}
                        selectedIds={selectedIds}
                    />
                ))}
        </>
    );
};
