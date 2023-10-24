import React from "react";

type Props = {
    onClick?: () => void;
    children: React.ReactNode;
};

const DeleteBookmarkButton = ({ onClick, children }: Props) => {
    return (
        <button
            onClick={onClick}
            className="flex rounded rounded-bl-none rounded-tl-none border-0 bg-transparent p-1.5 transition hover:bg-gray-200 dark:hover:bg-slate-800"
        >
            {children}
        </button>
    );
};

export default DeleteBookmarkButton;
