import React, { ReactNode } from "react";

export enum ButtonType {
    Primary,
    Secondary,
    Danger,
}

const getClassesByType = (type: ButtonType) => {
    switch (type) {
        case ButtonType.Primary:
            return "text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-200";
        case ButtonType.Danger:
            return "text-white bg-red-600 hover:bg-red-700 focus:ring-red-200";
    }

    return "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200 border";
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
    className,
    fluid = false,
}: Props) => {
    let classes = `${getClassesByType(type)} ${className} `;

    classes +=
        " mt-2 w-full inline-flex justify-center rounded-md px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:text-sm";

    if (!fluid) {
        classes += " sm:w-auto sm:mr-3"
    }

    return (
        <button type="button" className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
