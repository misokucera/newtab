import Button from "./Button";
import Dialog from "./Dialog";

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
        <Dialog open={open} onClose={onCancel}>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300">
                {title}
            </h3>
            {text && (
                <div className="mb-7 mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {text}
                    </p>
                </div>
            )}
            <div className="gap-5 sm:flex sm:gap-3">
                <Button variant="danger" onClick={onContinue}>
                    {continueLabel}
                </Button>
                <Button onClick={onCancel}>{cancelLabel}</Button>
            </div>
        </Dialog>
    );
};

export default AlertDialog;
