import AddIcon from "@material-ui/icons/Add";
import { TreeSelect } from "../ui/TreeSelect";
import React, { useContext, useState } from "react";
import { useGroups } from "../../hooks/useGroups";
import { GroupContext } from "../../contexts/GroupContext";
import Button, { ButtonType } from "../ui/Button";
import Card from "../ui/Card";
import Title from "../ui/Title";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "../ui/IconButton";
import TransparentIconButton from "../ui/TransparentIconButton";

const GroupSelectCard = () => {
    const groupTree = useGroups();
    const { addGroup } = useContext(GroupContext);

    const [open, setOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedGroup("");
    };

    const handleSubmit = () => {
        addGroup(selectedGroup);
        handleClose();
    };

    const handleSelection = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    if (!groupTree) {
        return null;
    }

    return (
        <>
            {open ? (
                <Card>
                    <div className="flex items-center justify-between mb-2">
                        <Title className="truncate">
                            Select bookmark directory
                        </Title>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <IconButton
                                aria-label="delete"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </div>
                    <div className="mt-2 mb-7 text-left">
                        <p className="text-sm text-gray-500">
                            <TreeSelect
                                root={groupTree}
                                onSelect={handleSelection}
                            />
                        </p>
                    </div>
                    <div className="sm:flex">
                        <Button
                            type={ButtonType.Primary}
                            onClick={handleSubmit}
                        >
                            Add new group
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                </Card>
            ) : (
                <TransparentIconButton className="ml-2" onClick={handleOpen}>
                    <AddIcon />
                </TransparentIconButton>
            )}
        </>
    );
};

export default GroupSelectCard;
