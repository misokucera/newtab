import classnames from "classnames";
import React, { ReactNode } from "react";

export enum ButtonType {
    Primary,
    Secondary,
    Danger,
}

const getClassesByType = (type: ButtonType) => {
    switch (type) {
        case ButtonType.Primary:
            return "text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-blue-200 dark:bg-sky-700 dark:text-sky-200 dark:hover:bg-sky-600 dark:focus:outline-sky-600";
        case ButtonType.Danger:
            return "text-white bg-red-600 dark:bg-red-800 dark:text-red-200 hover:bg-red-700 focus:ring-red-200";
    }

    return "border-gray-300 dark:border-0 bg-white dark:bg-slate-600 dark:text-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200 dark:hover:bg-slate-500 border";
};

type Props = {
    children: ReactNode;
    onClick: () => void;
    type?: ButtonType;
    className?: string;
    fluid?: boolean;
};

const Button = ({
    children,
    onClick,
    type = ButtonType.Secondary,
    className = "",
    fluid = false,
}: Props) => {
    return (
        <button
            type="button"
            className={classnames(
                getClassesByType(type),
                className,
                "mt-2 w-full inline-flex justify-center rounded-md px-4 py-2 text-base font-medium sm:mt-0 sm:text-sm",
                { "sm:w-auto sm:mr-3": !fluid },
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
