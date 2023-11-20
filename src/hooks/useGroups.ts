import { useEffect, useState } from "react";
import { getMockedGroups } from "../api/mocks/bookmarks.mock";

export type BookmarkTreeNode = {
    id: string;
    label: string;
    children?: BookmarkTreeNode[];
};

const supportsBookmarks = () => chrome?.bookmarks !== undefined;

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
        if (supportsBookmarks()) {
            chrome.bookmarks.getTree((trees) => parseTrees(trees));
        } else {
            setTreeNode(getMockedGroups());
        }
    }, []);

    return treeNode;
}
