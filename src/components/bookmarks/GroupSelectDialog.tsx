import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TreeSelect } from "../ui/TreeSelect";
import React, { useContext, useState } from "react";
import { useGroups } from "../../hooks/useGroups";
import { GroupContext } from "../../contexts/GroupContext";

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
                <DialogTitle>Select bookmark directory</DialogTitle>
                <DialogContent>
                    <TreeSelect root={groupTree} onSelect={handleSelection} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default GroupSelectDialog;
