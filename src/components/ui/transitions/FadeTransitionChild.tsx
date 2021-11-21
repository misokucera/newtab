import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";

type Props = {
    children: React.ReactNode;
};

const FadeTransitionChild = ({ children }: Props) => {
    return (
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            {children}
        </Transition.Child>
    );
};

export default FadeTransitionChild;
