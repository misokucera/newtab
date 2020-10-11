import {useEffect, useState} from "react";
import {bookmarksMockedData} from "../api/mocks/bookmarks.mock";

export type Bookmark = {
    id: string,
    title: string,
    url: string,
    index: number
}

export function useBookmarkTree(treeId: string): Bookmark[] {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    // @ts-ignore
    useEffect(() => {
        //@ts-ignore
        if (chrome !== undefined && chrome.bookmarks !== undefined) {
            // @ts-ignore
            chrome.bookmarks.getSubTree(treeId, (tree) => {
                console.log(tree[0].children);
                const bookmarks = tree[0].children.map((bookmark: any) => ({
                    id: bookmark.id,
                    title: bookmark.title,
                    url: bookmark.url,
                    index: bookmark.index
                }));

                setBookmarks(bookmarks);
            });
        } else {
            const bookmarks = JSON.parse(bookmarksMockedData).map((bookmark: any) => ({
                id: bookmark.id,
                title: bookmark.title,
                url: bookmark.url,
                index: bookmark.index
            }));
            setBookmarks(bookmarks);
        }
    }, []);


    return bookmarks;
}