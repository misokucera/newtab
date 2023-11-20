import React, { createContext, useEffect, useState } from "react";
import { store, sync } from "../services/storage";

const storageKey = "groups";

const GroupContext = createContext<{
    groups: string[];
    addGroup: (groupId: string) => void;
    removeGroup: (groupId: string) => void;
    reorderGroups: (orderedGroups: string[]) => void;
} | null>(null);

type Props = {
    children?: React.ReactNode;
};

export const GroupProvider = ({ children }: Props) => {
    const [groups, setGroups] = useState<string[]>([]);

    useEffect(() => {
        sync(storageKey).then((groups) => setGroups(groups || []));
    }, []);

    const addGroup = (groupId: string) => {
        const filteredGroups = groups.filter((value) => value !== groupId);
        const updatedGroups = [...filteredGroups, groupId];

        setGroups(updatedGroups);
        store(storageKey, updatedGroups);
    };

    const removeGroup = (groupId: string) => {
        const filteredGroups = groups.filter((value) => value !== groupId);

        setGroups(filteredGroups);
        store(storageKey, filteredGroups);
    };

    const reorderGroups = (orderedGroups: string[]) => {
        setGroups(orderedGroups);
        store(storageKey, orderedGroups);
    };

    return (
        <GroupContext.Provider
            value={{
                groups,
                addGroup,
                removeGroup,
                reorderGroups,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};

export const useGroupContext = () => {
    const context = React.useContext(GroupContext);

    if (context === null) {
        throw new Error(
            "Hook useGroupContext must be used within a GroupProvider",
        );
    }

    return context;
};
