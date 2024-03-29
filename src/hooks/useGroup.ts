import { useEffect, useState } from "react";

export type Bookmark = {
    id: string;
    title: string;
    url: string;
    index: number;
};

// TODO: add missing types

const hasUrl = ({ url }: any) => !!url;

const mapTreeToBookmark = ({ id, title, url, index }: any) => ({
    id,
    title,
    url,
    index,
});

export function useGroup(groupId: string): {
    bookmarks: Bookmark[];
    title: string;
    reorderBookmarks: (bookmarks: Bookmark[]) => void;
} {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const updateBookmarks = () => {
            chrome.bookmarks.getSubTree(groupId, (trees: any) => {
                const tree = trees[0];

                if (tree) {
                    const bookmarks = tree.children
                        .filter(hasUrl)
                        .map(mapTreeToBookmark);

                    setBookmarks(bookmarks);
                    setTitle(tree.title);
                }
            });
        };

        const listener = () => updateBookmarks();

        updateBookmarks();

        chrome.bookmarks.onRemoved.addListener(listener);
        chrome.bookmarks.onChanged.addListener(listener);
        chrome.bookmarks.onCreated.addListener(listener);
        chrome.bookmarks.onMoved.addListener(listener);

        chrome.bookmarks.onChildrenReordered.addListener(listener);

        return () => {
            chrome.bookmarks.onRemoved.removeListener(listener);
            chrome.bookmarks.onChanged.removeListener(listener);
            chrome.bookmarks.onCreated.removeListener(listener);
            chrome.bookmarks.onMoved.removeListener(listener);

            chrome.bookmarks.onChildrenReordered.removeListener(listener);
        };
    }, [groupId]);

    const reorderBookmarks = (bookmarks: Bookmark[]) => {
        setBookmarks(bookmarks);

        bookmarks.forEach((bookmark) => {
            chrome.bookmarks.move(bookmark.id, {
                parentId: groupId,
                index: bookmark.index,
            });
        });
    };

    return { bookmarks, title, reorderBookmarks };
}
