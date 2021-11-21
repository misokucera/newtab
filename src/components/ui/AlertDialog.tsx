import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonType } from "./Button";
import FadeTransitionChild from "./transitions/FadeTransitionChild";
import FadeAndPopTransitionChild from "./transitions/FadeAndTranslateTransitionChild";

type Props = {
    open: boolean;
    onContinue: () => void;
    onCancel: () => void;
    title: string;
    text?: string;
    continueLabel?: string;
    cancelLabel?: string;
};

const AlertDialog = ({
    open,
    onContinue,
    onCancel,
    title,
    text,
    cancelLabel = "Cancel",
    continueLabel = "Continue",
}: Props) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={onCancel}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <FadeTransitionChild>
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </FadeTransitionChild>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <FadeAndPopTransitionChild>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        {text && (
                                            <div className="mt-2 mb-7">
                                                <p className="text-sm text-gray-500">
                                                    {text}
                                                </p>
                                            </div>
                                        )}
                                        <div className="sm:flex">
                                            <Button
                                                text={continueLabel}
                                                type={ButtonType.Danger}
                                                onClick={onContinue}
                                            />
                                            <Button
                                                text={cancelLabel}
                                                onClick={onCancel}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeAndPopTransitionChild>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AlertDialog;
