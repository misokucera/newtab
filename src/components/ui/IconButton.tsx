import classnames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

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
            className={twMerge(
                classnames(
                    "flex rounded-lg border-0 bg-white p-3 text-gray-500 transition duration-150 dark:bg-slate-700 dark:text-gray-400",
                    {
                        "opacity-50 hover:opacity-100": transparent,
                        "hover:bg-gray-100 dark:hover:bg-slate-600":
                            !transparent,
                    },
                ),
                className,
            )}
        >
            {children}
        </button>
    );
};

export default IconButton;
