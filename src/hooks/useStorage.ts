import { useEffect, useState } from "react";

export function useStorage(): any {
    const [groups, setInnerGroups] = useState<string[]>([]);

    // @ts-ignore
    useEffect(() => {
        //@ts-ignore
        if (chrome !== undefined && chrome.storage !== undefined) {
        //     @ts-ignore
            chrome.storage.sync.get(["groups"], function (result) {
                console.log("Value currently is " + result.groups);
                setInnerGroups(result.groups);
            });
        }
    }, []);

    const setGroups = (groupIds: string[]) => {
        // @ts-ignore
        if (chrome !== undefined && chrome.storage !== undefined) {
            // @ts-ignore
            chrome.storage.sync.set({groups: groupIds}, function () {
                console.log("Value is set to " + groupIds);
            });
        }
    };

    return [groups, setInnerGroups];
}
