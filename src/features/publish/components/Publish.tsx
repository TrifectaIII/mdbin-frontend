import React, {
    useState,
    useEffect,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';

import {
    Dialog,
    DialogTitle,
    makeStyles,
} from '@material-ui/core';

import isEmail from 'validator/lib/isEmail';

import {
    useAppSelector,
    useAppDispatch,
} from '../../../state/hooks';
import {
    selectPublishDocumentKey,
    selectPublishRequestStatus,
    publishDocument,
    resetPublish,
} from '../publishSlice';
import PublishForm from './PublishForm';
import PublishPending from './PublishPending';
import PublishError from './PublishError';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    centered: {
        textAlign: 'center',
    },
}));

// modal dialog for publishing documents
const Publish = (props: {
    open: boolean,
    handleClose: () => void,
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
    const [email, setEmail] = useState<string>('');

    // flags for completed form
    const emailValid = isEmail(email);
    const emailError = !emailValid && Boolean(email.length);
    const formComplete = emailValid && Boolean(verified);

    const handleClose = () => {

        const closeableStates = ['idle', 'error'];
        if (!closeableStates.includes(requestStatus)) return;
        // clear state before closing
        setVerified(null);
        setEmail('');
        props.handleClose();

    };

    const handlePublish = () => {

        if (!formComplete) return;
        if (requestStatus !== 'idle') return;
        dispatch(publishDocument(email, verified || ''));

    };

    // redirect when publish request is complete
    useEffect(() => {

        if (requestStatus !== 'success') return;
        if (!documentKey) return;
        history.push(`view/${documentKey}`);
        dispatch(resetPublish());

    }, [requestStatus, documentKey]);

    return (
        <Dialog
            className={classes.root}
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>
                Publish
            </DialogTitle>
            {requestStatus === 'pending' ? <PublishPending /> : <></>}
            {
                requestStatus === 'idle'
                    ? <PublishForm
                        email={email}
                        setEmail={setEmail}
                        emailError={emailError}
                        formComplete={formComplete}
                        setVerified={setVerified}
                        handleClose={handleClose}
                        handlePublish={handlePublish}
                    />
                    : <></>
            }
            {
                requestStatus === 'error'
                    ? <PublishError handleClose={handleClose}/>
                    : <></>
            }
        </Dialog>
    );

};

export default Publish;
