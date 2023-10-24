import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Title = ({ children, className }: Props) => {
    return (
        <h2
            className={`my-0 p-3 text-sm font-normal uppercase text-gray-400 ${className}`}
        >
            {children}
        </h2>
    );
};

export default Title;
