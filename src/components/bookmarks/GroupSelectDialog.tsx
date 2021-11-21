import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TreeSelect } from "../ui/TreeSelect";
import React, { useContext, useState } from "react";
import { useGroups } from "../../hooks/useGroups";
import { GroupContext } from "../../contexts/GroupContext";
import Dialog from "../ui/Dialog";
import Button, { ButtonType } from "../ui/Button";

const GroupSelectDialog = () => {
    const groupTree = useGroups();
    const { addGroup } = useContext(GroupContext);

    const [open, setOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState("");

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setSelectedGroup("");
    };

    const handleSubmit = () => {
        addGroup(selectedGroup);
        handleDialogClose();
    };

    const handleSelection = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    if (!groupTree) {
        return null;
    }

    return (
        <>
            <div className="fixed bottom-10 right-10">
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleDialogOpen}
                >
                    <AddIcon />
                </Fab>
            </div>
            <Dialog open={open} onClose={handleDialogClose}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Select bookmark directory
                </h3>
                <div className="mt-2 mb-7">
                    <p className="text-sm text-gray-500">
                        <TreeSelect
                            root={groupTree}
                            onSelect={handleSelection}
                        />
                    </p>
                </div>
                <div className="sm:flex">
                    <Button type={ButtonType.Primary} onClick={handleSubmit}>
                        Add new group
                    </Button>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </div>
            </Dialog>
        </>
    );
};

export default GroupSelectDialog;
