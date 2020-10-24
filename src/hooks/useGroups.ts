import { useEffect, useState } from "react";
import { getMockedGroups } from "../api/mocks/bookmarks.mock";
import { isDev } from "../services/environment";

export type BookmarkTreeNode = {
    id: string;
    label: string;
    children?: BookmarkTreeNode[];
};

const getTreeNode = (tree: any) => {
    if (!tree || !tree.children || tree.children.length === 0) {
        return null;
    }
    return {
        id: tree.id,
        label: tree.title,
        children: tree.children
            ? tree.children
                  .map((child: any) => getTreeNode(child))
                  .filter(Boolean)
            : [],
    };
};

export function useGroups(): BookmarkTreeNode | null {
    const [treeNode, setTreeNode] = useState<BookmarkTreeNode | null>(null);

    const parseTrees = (trees: any) => {
        const root = trees[0];
        const treeNode = getTreeNode(root);
        setTreeNode(treeNode);
    };

    useEffect(() => {
        if (isDev()) {
            setTreeNode(getMockedGroups());
        } else {
            chrome.bookmarks.getTree((trees: any) => parseTrees(trees));
        }
    }, []);

    return treeNode;
}
