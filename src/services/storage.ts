import { isDev } from "./environment";

const mockedGroups = ["1", "2"];

export const store = (key: string, value: any) => {
    if (!isDev()) {
        chrome.storage.sync.set({ [key]: value });
    }
};

export const sync = (key: string): Promise<any> => {
    return new Promise((resolve) => {
        if (!isDev()) {
            chrome.storage.sync.get(["groups"], function (result) {
                resolve(result[key]);
            });
        } else {
            resolve(mockedGroups);
        }
    });
};
