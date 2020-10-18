import { useEffect, useState } from "react";
import { mockedBookmarkDirectories } from "../api/mocks/bookmarks.mock";

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
        // @ts-ignore
        if (chrome !== undefined && chrome.bookmarks !== undefined) {
            // @ts-ignore
            chrome.bookmarks.getTree((trees) => parseTrees(trees));
        } else {
            setTreeNode(JSON.parse(mockedBookmarkDirectories));
        }
    }, []);

    return treeNode;
}
