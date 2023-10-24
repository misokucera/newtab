import classnames from "classnames";
import React from "react";

type Props = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    transparent?: boolean;
};

const IconButton = ({
    onClick,
    children,
    className = "",
    transparent = false,
}: Props) => {
    return (
        <button
            onClick={onClick}
            className={classnames(
                "flex text-gray-500 dark:text-gray-400 rounded-lg p-3 transition duration-150 border-0 bg-white dark:bg-slate-700",
                className,
                {
                    "opacity-50 hover:opacity-100": transparent,
                    "hover:bg-gray-100 dark:hover:bg-slate-600": !transparent,
                },
            )}
        >
            {children}
        </button>
    );
};

export default IconButton;
