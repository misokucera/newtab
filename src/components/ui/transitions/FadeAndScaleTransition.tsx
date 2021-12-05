import { Transition } from "@headlessui/react";
import React, { ReactNode } from "react";
import { TransitionEvents } from "@headlessui/react/dist/components/transitions/transition";

type Props = {
    show: boolean;
    children: ReactNode;
} & TransitionEvents;

const FadeAndScaleTransition = ({
    show,
    beforeEnter,
    beforeLeave,
    afterEnter,
    afterLeave,
    children,
}: Props) => {
    return (
        <Transition
            show={show}
            enter="transition-all transform-gpu origin-top duration-75"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition-all transform-gpu origin-top duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
            afterLeave={afterLeave}
            afterEnter={afterEnter}
            beforeEnter={beforeEnter}
            beforeLeave={beforeLeave}
        >
            {children}
        </Transition>
    );
};

export default FadeAndScaleTransition;
