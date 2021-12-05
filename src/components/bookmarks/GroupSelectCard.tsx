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
import FadeAndScaleTransition from "../ui/transitions/FadeAndScaleTransition";

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
    };

    const handleClose = () => {
        setSelectedGroup("");
        handleHideSelector();
    };

    const handleSelection = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    if (!groupTree) {
        return null;
    }

    return (
        <>
            <FadeAndScaleTransition
                show={showSelector}
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
                            fluid
                        >
                            Add new group
                        </Button>
                    </div>
                </Card>
            </FadeAndScaleTransition>
            <FadeAndScaleTransition
                show={showButton}
                afterLeave={() => setShowSelector(true)}
            >
                <IconButton
                    onClick={handleHideButton}
                    className="ml-2 shadow-sm"
                    transparent
                >
                    <AddIcon />
                </IconButton>
            </FadeAndScaleTransition>
        </>
    );
};

export default GroupSelectCard;
