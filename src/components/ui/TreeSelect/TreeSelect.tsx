import React from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

type Node = {
    id: string;
    label: string;
    children?: Node[];
};

type Props = {
    root: Node;
    onSelect?: (id: string) => void;
};

export const TreeSelect = ({ root, onSelect }: Props) => {
    const handleSelect = (event: React.ChangeEvent<{}>, nodeId: string) => {
        if (onSelect) {
            onSelect(nodeId);
        }
    };

    const renderNode = (node: Node) => {
        return (
            <TreeItem nodeId={node.id} label={node.label} key={node.id}>
                {node.children &&
                    node.children.map((childNode) => renderNode(childNode))}
            </TreeItem>
        );
    };

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={handleSelect}
        >
            {root.children &&
                root.children.map((childNode) => renderNode(childNode))}
        </TreeView>
    );
};
