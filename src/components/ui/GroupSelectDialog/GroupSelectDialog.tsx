import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TreeSelect } from "../TreeSelect/TreeSelect";
import React, { useState } from "react";
import { useGroups } from "../../../hooks/useGroups";

type Props = {
    onSelect?: (groupId: string) => void;
};

const GroupSelectDialog = ({ onSelect }: Props) => {
    const groupTree = useGroups();

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
        if (onSelect) {
            onSelect(selectedGroup);
        }
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
            <Fab color="primary" aria-label="add" onClick={handleDialogOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Select bookmark directory</DialogTitle>
                <DialogContent>
                    <TreeSelect
                        root={groupTree}
                        onSelect={handleSelection}
                    />
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
