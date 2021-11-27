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
            className={`flex text-gray-500 rounded-lg p-4 transition duration-150 border-0 bg-white hover:bg-gray-100 ${className}`}
        >
            {children}
        </button>
    );
};

export default IconButton;
