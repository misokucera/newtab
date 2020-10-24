import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import * as React from "react";

type Props = {
    open: boolean;
    onContinue: () => void;
    onCancel: () => void;
    title: string;
    text?: string;
};

export const AlertDialog = ({
    open,
    onContinue,
    onCancel,
    title,
    text,
}: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={onContinue} color="primary" autoFocus>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};
