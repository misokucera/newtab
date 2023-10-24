import { VariantProps, cva } from "class-variance-authority";
import classnames from "classnames";
import React, { ComponentProps } from "react";

export enum ButtonType {
    Primary,
    Secondary,
    Danger,
}

const variants = cva(
    "mt-2 inline-flex w-full justify-center rounded-md px-4 py-2 text-base font-medium sm:mt-0 sm:w-auto sm:text-sm",
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-blue-200 dark:bg-sky-700 dark:text-sky-200 dark:hover:bg-sky-600 dark:focus:outline-sky-600",
                secondary:
                    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200 dark:border-0 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500",
                danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200 dark:bg-red-800 dark:text-red-200",
            },
        },
    },
);

type Props = ComponentProps<"button"> & VariantProps<typeof variants>;

const Button = ({
    children,
    onClick,
    variant = "secondary",
    className,
}: Props) => {
    return (
        <button
            type="button"
            className={classnames(className, variants({ variant }))}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
