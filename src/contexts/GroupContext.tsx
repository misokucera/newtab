import React, { createContext, useState } from "react";

type GroupContextType = [string[], (groupIds: string[]) => void];

type Props = {
    children?: React.ReactNode;
};

export const GroupContext = createContext<GroupContextType>([[], () => {}]);

export const GroupProvider = ({ children }: Props) => {
    const [groups, setGroups] = useState<string[]>([]);

    return (
        <GroupContext.Provider value={[groups, setGroups]}>
            {children}
        </GroupContext.Provider>
    );
};
