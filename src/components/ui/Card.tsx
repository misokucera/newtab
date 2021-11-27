import React from "react";

type Props = {
    children: React.ReactNode,
    className?: string
}

const Card = ({children, className}: Props) => {
    return (
        <div className={`mx-2 p-3 max-w-xs rounded-lg bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );
};

export default Card;