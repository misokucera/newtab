import { Fragment, ReactNode } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import FadeTransitionChild from "./transitions/FadeTransitionChild";
import FadeAndPopTransitionChild from "./transitions/FadeAndPopTransitionChild";

type Props = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Dialog = ({ open, onClose, children }: Props) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <HeadlessDialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                    <FadeTransitionChild>
                        <HeadlessDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </FadeTransitionChild>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:h-screen sm:align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <FadeAndPopTransitionChild>
                        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-lg sm:align-middle">
                            <div className="bg-white p-6 dark:bg-slate-700 sm:p-10">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeAndPopTransitionChild>
                </div>
            </HeadlessDialog>
        </Transition.Root>
    );
};

export default Dialog;
