import getTreeMock from "./bookmarks.getTree.mock.json";
import getSubTreeMock from "./bookmarks.getSubTree.mock.json";
import { isDevelopment } from "../services/environment";

export const mockChromeAPI = () => {
    if (!isDevelopment()) {
        return;
    }

    globalThis.chrome = {
        bookmarks: {
            getTree: (callback: any) => {
                callback(getTreeMock);
            },
            getSubTree: (id: string, callback: any) => {
                callback(getSubTreeMock);
            },
            remove: (id: string) => {},
            onRemoved: {
                addListener: () => {},
                removeListener: () => {},
            },
            onChanged: {
                addListener: () => {},
                removeListener: () => {},
            },
            onCreated: {
                addListener: () => {},
                removeListener: () => {},
            },
            onMoved: {
                addListener: () => {},
                removeListener: () => {},
            },
            onChildrenReordered: {
                addListener: () => {},
                removeListener: () => {},
            },
        },
        storage: {
            sync: {
                set: () => {},
                get: () => {},
            },
        },
    } as unknown as typeof chrome;
};
