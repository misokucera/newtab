import AddIcon from "@material-ui/icons/Add";
import { TreeSelect } from "../ui/TreeSelect";
import React, { useContext, useEffect, useState } from "react";
import { useGroups } from "../../hooks/useGroups";
import { GroupContext } from "../../contexts/GroupContext";
import Button, { ButtonType } from "../ui/Button";
import Card from "../ui/Card";
import Title from "../ui/Title";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "../ui/IconButton";
import TransparentIconButton from "../ui/TransparentIconButton";
import { Transition } from "@headlessui/react";

const GroupSelectCard = () => {
    const groupTree = useGroups();
    const { addGroup } = useContext(GroupContext);

    const [showSelector, setShowSelector] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState("");

    const handleHideButton = () => {
        setShowButton(false);
    };

    const handleHideSelector = () => {
        setShowSelector(false);
    };

    const handleAfterSelectorLeave = () => {
        if (selectedGroup) {
            addGroup(selectedGroup);
            setSelectedGroup("");
        }

        setShowButton(true);
    }

    const handleClose = () => {
        setSelectedGroup("");
        handleHideSelector();
    }

    const handleSelection = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    if (!groupTree) {
        return null;
    }

    return (
        <>
            <Transition
                show={showSelector}
                enter="transition-all transform-gpu origin-top duration-150"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transition-all transform-gpu origin-top duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
                afterLeave={handleAfterSelectorLeave}
            >
                <Card>
                    <div className="flex items-center justify-between mb-2">
                        <Title className="truncate">
                            Select bookmark directory
                        </Title>
                        <div>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </div>
                    <div className="p-1.5 mt-2 mb-7 text-left">
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
                            className="w-full block"
                            onClick={handleHideSelector}
                        >
                            Add new group
                        </Button>
                    </div>
                </Card>
            </Transition>
            <Transition
                show={showButton}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setShowSelector(true)}
            >
                <TransparentIconButton
                    className="ml-2"
                    onClick={handleHideButton}
                >
                    <AddIcon />
                </TransparentIconButton>
            </Transition>
        </>
    );
};

export default GroupSelectCard;
