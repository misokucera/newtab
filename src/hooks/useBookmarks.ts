import { useEffect, useState } from "react";
import { getMockedBookmarks } from "../api/mocks/bookmarks.mock";
import { isDev } from "../services/environment";

export type Bookmark = {
    id: string;
    title: string;
    url: string;
    index: number;
};

// TODO: add missing types

export function useBookmarks(
    groupId: string
): { bookmarks: Bookmark[]; title: string } {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        if (isDev()) {
            setBookmarks(getMockedBookmarks());
            setTitle("Nejaký dlhší názov");
        } else {
            chrome.bookmarks.getSubTree(groupId, (trees: any) => {
                const tree = trees[0];

                if (!tree) {
                    return;
                }

                const bookmarks = tree.children
                    .filter((bookmark: any) => bookmark.url)
                    .map((bookmark: any) => ({
                        id: bookmark.id,
                        title: bookmark.title,
                        url: bookmark.url,
                        index: bookmark.index,
                    }));

                setBookmarks(bookmarks);

                setTitle(tree.title);
            });
        }
    }, [groupId]);

    return { bookmarks, title };
}
