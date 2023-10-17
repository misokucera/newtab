import React, { useContext, useState } from "react";
import { useGroups } from "../../hooks/useGroups";
import { GroupContext } from "../../contexts/GroupContext";
import Button, { ButtonType } from "../ui/Button";
import Card from "../ui/Card";
import Title from "../ui/Title";
import { MdClose, MdAdd } from "react-icons/md";
import IconButton from "../ui/IconButton";
import FadeAndScaleTransition from "../ui/transitions/FadeAndScaleTransition";
import { TreeSelect, TreeNode } from "../ui/TreeSelect";

const GroupSelectCard = () => {
    const groupTree = useGroups();
    const { addGroup } = useContext(GroupContext);

    const [showSelector, setShowSelector] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [selectedGroupNode, setSelectedGroupNode] = useState<TreeNode | null>(
        null
    );

    const handleHideButton = () => {
        setShowButton(false);
    };

    const handleHideSelector = () => {
        setShowSelector(false);
    };

    const handleAfterSelectorLeave = () => {
        if (selectedGroupNode) {
            addGroup(selectedGroupNode.id);
            setSelectedGroupNode(null);
        }

        setShowButton(true);
    };

    const handleClose = () => {
        setSelectedGroupNode(null);
        handleHideSelector();
    };

    const handleSelection = (node: TreeNode) => {
        setSelectedGroupNode(node);
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
                            {selectedGroupNode
                                ? selectedGroupNode.label
                                : "Select bookmark directory"}
                        </Title>
                        <div>
                            <IconButton onClick={handleClose}>
                                <MdClose size={20} />
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
                    <MdAdd size={20} />
                </IconButton>
            </FadeAndScaleTransition>
        </>
    );
};

export default GroupSelectCard;
