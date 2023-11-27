import { useEffect, useState } from "react";

export type TreeNode = {
    id: string;
    label: string;
    linkCount: number;
    children?: TreeNode[];
};

const getTreeNode = (tree: any) => {
    if (!tree || !tree.children || tree.children.length === 0) {
        return null;
    }
    return {
        id: tree.id,
        label: tree.title,
        linkCount: tree.children.filter((child: any) => child.url).length,
        children: tree.children
            ? tree.children
                  .map((child: any) => getTreeNode(child))
                  .filter(Boolean)
            : [],
    };
};

export function useGroups(): TreeNode | null {
    const [treeNode, setTreeNode] = useState<TreeNode | null>(null);

    const parseTrees = (trees: any) => {
        const root = trees[0];
        const treeNode = getTreeNode(root);
        setTreeNode(treeNode);
    };

    useEffect(() => {
        chrome.bookmarks.getTree((trees) => parseTrees(trees));
    }, []);

    return treeNode;
}
