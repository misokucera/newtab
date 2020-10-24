import { useEffect, useState } from "react";
import { isDev } from "../services/environment";

export function useStorage(): any {
    const [groups, setInnerGroups] = useState<string[]>([]);

    useEffect(() => {
        if (!isDev()) {
            chrome.storage.sync.get(["groups"], function (result: any) {
                console.log("Value currently is " + result.groups);
                setInnerGroups(result.groups);
            });
        }
    }, []);

    const setGroups = (groupIds: string[]) => {
        if (!isDev()) {
            chrome.storage.sync.set({groups: groupIds}, function () {
                console.log("Value is set to " + groupIds);
            });
        }
    };

    return [groups, setInnerGroups];
}
