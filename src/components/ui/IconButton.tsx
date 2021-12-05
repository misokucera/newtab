import React from "react";

type Props = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    transparent?: boolean;
};

const IconButton = ({ onClick, children, className, transparent = false }: Props) => {
    let classes = `flex text-gray-500 rounded-lg p-3 transition duration-150 border-0 bg-white ${className} `;

    classes += transparent ? 'opacity-50 hover:opacity-100' : 'hover:bg-gray-100';

    return (
        <button
            onClick={onClick}
            className={classes}
        >
            {children}
        </button>
    );
};

export default IconButton;
