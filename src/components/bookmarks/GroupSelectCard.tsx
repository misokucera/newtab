import { useState } from "react";
import { useGroups } from "../../hooks/useGroups";
import { useGroupContext } from "../../contexts/GroupContext";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Title from "../ui/Title";
import { MdClose, MdAdd } from "react-icons/md";
import IconButton from "../ui/IconButton";
import FadeAndScaleTransition from "../ui/transitions/FadeAndScaleTransition";
import { TreeSelect, TreeNode } from "../ui/TreeSelect";

const GroupSelectCard = () => {
    const groupTree = useGroups();
    const { addGroup } = useGroupContext();

    const [showSelector, setShowSelector] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [selectedGroupNode, setSelectedGroupNode] = useState<TreeNode | null>(
        null,
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
                <Card className="mx-4">
                    <div className="mb-2 flex items-center justify-between">
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
                    <div className="mb-7 mt-2 p-1.5 text-left">
                        <p className="text-sm text-gray-500">
                            <TreeSelect
                                root={groupTree}
                                onSelect={handleSelection}
                            />
                        </p>
                    </div>
                    <div className="sm:flex">
                        <Button
                            variant="primary"
                            className="sm:w-full"
                            onClick={handleHideSelector}
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
                    className="mx-4 shadow-sm"
                    transparent
                >
                    <MdAdd size={20} />
                </IconButton>
            </FadeAndScaleTransition>
        </>
    );
};

export default GroupSelectCard;
