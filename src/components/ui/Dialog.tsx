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
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={onClose}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <FadeTransitionChild>
                        <HeadlessDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </FadeTransitionChild>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <FadeAndPopTransitionChild>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg">
                            <div className="bg-white px-3 pt-4 pb-3 sm:p-10">
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
