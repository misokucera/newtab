import { useEffect, useState } from "react";
import { getMockedBookmarks } from "../api/mocks/bookmarks.mock";
import { isDev } from "../services/environment";

export type Bookmark = {
    id: string;
    title: string;
    url: string;
    index: number;
};

export function useBookmarks(groupId: string): Bookmark[] {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    useEffect(() => {
        if (isDev()) {
            setBookmarks(getMockedBookmarks());
        } else {
            chrome.bookmarks.getSubTree(groupId, (tree: any) => {
                const bookmarks = tree[0].children
                    .filter((bookmark: any) => bookmark.url)
                    .map((bookmark: any) => ({
                        id: bookmark.id,
                        title: bookmark.title,
                        url: bookmark.url,
                        index: bookmark.index,
                    }));

                setBookmarks(bookmarks);
            });
        }
    }, [groupId]);

    return bookmarks;
}
