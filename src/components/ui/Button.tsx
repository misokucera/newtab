import { VariantProps, cva } from "class-variance-authority";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const variants = cva(
    "inline-flex justify-center rounded-md px-4 py-2 text-base font-medium transition-colors sm:text-sm",
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-blue-200 dark:bg-sky-700 dark:text-sky-200 dark:hover:bg-sky-600 dark:focus:outline-sky-600",
                secondary:
                    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200 dark:border-0 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500",
                danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200 dark:bg-red-800 dark:text-red-200",
            },
            disabled: {
                true: "bg-gray-300 text-gray-700 opacity-50 hover:bg-gray-300 dark:bg-slate-600 dark:text-slate-900 hover:dark:bg-slate-600",
            },
        },
    },
);

type Props = ComponentProps<"button"> & VariantProps<typeof variants>;

const Button = ({
    children,
    variant = "secondary",
    className,
    disabled,
    ...props
}: Props) => {
    return (
        <button
            type="button"
            className={twMerge(variants({ variant, disabled }), className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
