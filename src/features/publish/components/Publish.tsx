import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
    publishDocument,
    resetPublish,
    selectPublishDocumentKey,
    selectPublishRequestStatus,
} from "../publishSlice";
import PublishError from "./PublishError";
import PublishForm from "./PublishForm";
import PublishPending from "./PublishPending";

const useStyles = makeStyles((theme) => ({
    root: {},
    centered: {
        textAlign: "center",
    },
}));

// modal dialog for publishing documents
const Publish = (props: {
    isOpen: boolean;
    close: () => void;
}): JSX.Element => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const history = useHistory();

    // select the current publish request status from state
    const requestStatus = useAppSelector(selectPublishRequestStatus);
    const documentKey = useAppSelector(selectPublishDocumentKey);

    // state for captcha verification
    const [verified, setVerified] = useState<string | null>(null);

    // state for email input
    const [email, setEmail] = useState<string>("");

    // flags for completed form
    const emailValid = isEmail(email);
    const emailError = !emailValid && Boolean(email.length);
    const formComplete = emailValid && Boolean(verified);

    const handleClose = () => {
        const closeableStates = ["idle", "error"];
        if (!closeableStates.includes(requestStatus)) return;
        // clear state before closing
        setVerified(null);
        setEmail("");
        props.close();
    };

    const handlePublish = () => {
        if (!formComplete) return;
        if (requestStatus !== "idle") return;
        dispatch(publishDocument(email, verified || ""));
    };

    // redirect when publish request is complete
    useEffect(() => {
        if (requestStatus !== "success") return;
        if (!documentKey) return;
        history.push(`view/${documentKey}`);
        dispatch(resetPublish());
    }, [requestStatus, documentKey]);

    return (
        <Dialog
            className={classes.root}
            open={props.isOpen}
            onClose={handleClose}
        >
            <DialogTitle>Publish</DialogTitle>
            {requestStatus === "pending" ? <PublishPending /> : <></>}
            {requestStatus === "idle" ? (
                <PublishForm
                    email={email}
                    setEmail={setEmail}
                    emailError={emailError}
                    formComplete={formComplete}
                    setVerified={setVerified}
                    handleClose={handleClose}
                    handlePublish={handlePublish}
                />
            ) : (
                <></>
            )}
            {requestStatus === "error" ? (
                <PublishError handleClose={handleClose} />
            ) : (
                <></>
            )}
        </Dialog>
    );
};

export default Publish;
