import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    makeStyles,
} from "@material-ui/core";
import { Close as CancelIcon, Refresh as ResetIcon } from "@material-ui/icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { resetPublish, selectPublishErrorMessage } from "../publishSlice";

const useStyles = makeStyles((theme) => ({
    content: {},
    actions: {},
}));

// display for publish modal when request has errored
const PublishError = (props: { handleClose: () => void }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const errorMessage = useAppSelector(selectPublishErrorMessage);

    return (
        <>
            <DialogContent className={classes.content}>
                <DialogContentText>
                    Error: {errorMessage || "Request Failed"}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    onClick={() => dispatch(resetPublish())}
                    color="primary"
                    variant="contained"
                    startIcon={<ResetIcon />}
                >
                    Try Again
                </Button>
                <Button
                    onClick={props.handleClose}
                    color="secondary"
                    variant="contained"
                    startIcon={<CancelIcon />}
                >
                    Cancel
                </Button>
            </DialogActions>
        </>
    );
};

export default PublishError;
