import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Title = ({ children, className }: Props) => {
    return (
        <h2
            className={`p-3 my-0 uppercase text-sm font-normal text-gray-400 ${className}`}
        >
            {children}
        </h2>
    );
};

export default Title;
