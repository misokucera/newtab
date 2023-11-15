import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Card = ({ children, className }: Props) => {
    return (
        <div
            className={twMerge(
                "w-80 rounded-lg bg-white p-3 shadow-sm dark:bg-slate-700",
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Card;
