import Button, { ButtonType } from "./Button";
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
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
            </h3>
            {text && (
                <div className="mt-2 mb-7">
                    <p className="text-sm text-gray-500">{text}</p>
                </div>
            )}
            <div className="sm:flex">
                <Button
                    text={continueLabel}
                    type={ButtonType.Danger}
                    onClick={onContinue}
                />
                <Button text={cancelLabel} onClick={onCancel} />
            </div>
        </Dialog>
    );
};

export default AlertDialog;
