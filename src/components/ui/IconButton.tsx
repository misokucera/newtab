import React from "react";

type Props = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
};

const IconButton = ({ onClick, children, className }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`flex rounded-lg p-4 hover:bg-white border-0 bg-white ${className}`}
        >
            {children}
        </button>
    );
};

export default IconButton;
