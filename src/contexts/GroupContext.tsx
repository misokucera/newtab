import React, { createContext, useEffect, useState } from "react";
import { isDev } from "../services/environment";

// There is issue with tuple types in react-scripts: https://github.com/facebook/create-react-app/issues/9515
// type GroupContextType = [string[], (groupIds: string[]) => void];

type GroupContextType = {
    groups: string[];
    addGroup: (groupId: string) => void;
    removeGroup: (groupId: string) => void;
};

type Props = {
    children?: React.ReactNode;
};

export const GroupContext = createContext<GroupContextType>({
    groups: [],
    addGroup: () => {},
    removeGroup: () => {},
});

export const GroupProvider = ({ children }: Props) => {
    const [groups, setGroups] = useState<string[]>([]);

    useEffect(() => {
        if (!isDev()) {
            chrome.storage.sync.get(["groups"], function (result) {
                setGroups(result.groups);
            });
        } else {
            setGroups(["1", "2"]);
        }
    }, []);

    const storeGroups = (groups: string[]) => {
        if (!isDev()) {
            chrome.storage.sync.set({ groups });
        }
    }

    const addGroup = (groupId: string) => {
        const filteredGroups = groups.filter(value => value !== groupId);
        const updatedGroups = [...filteredGroups, groupId];
        setGroups(updatedGroups);
        storeGroups(updatedGroups);
    };

    const removeGroup = (groupId: string) => {
        const filteredGroups = groups.filter(value => value !== groupId);
        setGroups(filteredGroups);
        storeGroups(filteredGroups);
    };

    return (
        <GroupContext.Provider
            value={{
                groups,
                addGroup,
                removeGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};
