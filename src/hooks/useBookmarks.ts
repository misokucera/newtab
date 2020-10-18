import { useEffect, useState } from "react";
import { bookmarksSubtreeMockedData } from "../api/mocks/bookmarks.mock";

export type Bookmark = {
    id: string;
    title: string;
    url: string;
    index: number;
};

export function useBookmarks(groupId: string): Bookmark[] {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    // @ts-ignore
    useEffect(() => {
        //@ts-ignore
        if (chrome !== undefined && chrome.bookmarks !== undefined) {
            // @ts-ignore
            chrome.bookmarks.getSubTree(groupId, (tree) => {
                console.log(tree[0].children);
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
        } else {
            const bookmarks = JSON.parse(bookmarksSubtreeMockedData).map(
                (bookmark: any) => ({
                    id: bookmark.id,
                    title: bookmark.title,
                    url: bookmark.url,
                    index: bookmark.index,
                })
            );
            setBookmarks(bookmarks);
        }
    }, []);

    return bookmarks;
}
