import React from "react";
import IconButton from "./IconButton";

type Props = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
};

const TransparentIconButton = ({ onClick, children, className }: Props) => {
    return (
        <IconButton
            onClick={onClick}
            className={`${className} opacity-50 hover:opacity-100 transition-opacity`}
        >
            {children}
        </IconButton>
    );
};

export default TransparentIconButton;
