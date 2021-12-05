import React from "react";

type Props = {
    onClick?: () => void;
    children: React.ReactNode;
};

const DeleteBookmarkButton = ({ onClick, children }: Props) => {
    return (
        <button
            onClick={onClick}
            className="flex p-1.5 rounded rounded-tl-none rounded-bl-none border-0 bg-transparent hover:bg-gray-200 transition"
        >
            {children}
        </button>
    );
};

export default DeleteBookmarkButton;
