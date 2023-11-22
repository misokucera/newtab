export const store = (key: string, value: any) => {
    chrome.storage.sync.set({ [key]: value });
};

export const sync = (key: string): Promise<any> => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(["groups"], function (result) {
            resolve(result[key]);
        });
    });
};
