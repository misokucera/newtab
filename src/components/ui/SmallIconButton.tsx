import React from "react";

type Props = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
};

const SmallIconButton = ({ onClick, children, className }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`flex rounded-sm hover:bg-white border-0 bg-transparent ${className}`}
        >
            {children}
        </button>
    );
};

export default SmallIconButton;
