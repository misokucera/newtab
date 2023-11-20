const mockedGroups = ["1", "2"];

const supportsSyncStorage = () => chrome?.storage?.sync !== undefined;

export const store = (key: string, value: any) => {
    if (supportsSyncStorage()) {
        chrome.storage.sync.set({ [key]: value });
    }
};

export const sync = (key: string): Promise<any> => {
    return new Promise((resolve) => {
        if (supportsSyncStorage()) {
            chrome.storage.sync.get(["groups"], function (result) {
                resolve(result[key]);
            });
        } else {
            resolve(mockedGroups);
        }
    });
};
