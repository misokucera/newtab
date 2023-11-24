import { useRef, useState } from "react";
import { TreeNode, useGroups } from "../../hooks/useGroups";
import { useGroupContext } from "../../contexts/GroupContext";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Title from "../ui/Title";
import { MdClose, MdAdd } from "react-icons/md";
import IconButton from "../ui/IconButton";
import FadeAndScaleTransition from "../ui/transitions/FadeAndScaleTransition";
import { TreeSelect } from "../ui/TreeSelect";

const GroupSelectCard = () => {
    const groupTree = useGroups();
    const containerRef = useRef<HTMLDivElement>(null);
    const { addGroup, groups } = useGroupContext();

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
        setShowButton(true);
    };

    const handleAfterSelectorLeave = () => {
        if (selectedGroupNode) {
            addGroup(selectedGroupNode.id);
            setSelectedGroupNode(null);
        }
    };

    const handleClose = () => {
        setSelectedGroupNode(null);
        handleHideSelector();
    };

    const handleSelection = (node: TreeNode) => {
        if (!groups.includes(node.id)) {
            setSelectedGroupNode(node);
        } else {
            setSelectedGroupNode(null);
        }
    };

    if (!groupTree) {
        return null;
    }

    return (
        <div ref={containerRef}>
            <FadeAndScaleTransition
                show={showSelector}
                afterLeave={handleAfterSelectorLeave}
                afterEnter={() => {
                    containerRef.current?.scrollIntoView({
                        behavior: "smooth",
                        inline: "end",
                    });
                }}
            >
                <div>
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
                                    selectedNode={selectedGroupNode}
                                />
                            </p>
                        </div>
                        <div className="sm:flex">
                            <Button
                                disabled={!selectedGroupNode}
                                variant="primary"
                                className="sm:w-full"
                                onClick={handleHideSelector}
                            >
                                Add new group
                            </Button>
                        </div>
                    </Card>
                </div>
            </FadeAndScaleTransition>
            <FadeAndScaleTransition
                show={showButton}
                afterLeave={() => {
                    setShowSelector(true);
                }}
                afterEnter={() => {
                    containerRef.current?.scrollIntoView({
                        inline: "end",
                    });
                }}
            >
                <IconButton
                    onClick={handleHideButton}
                    className="mx-4 shadow-sm"
                    transparent
                >
                    <MdAdd size={20} />
                </IconButton>
            </FadeAndScaleTransition>
        </div>
    );
};

export default GroupSelectCard;
