import React, {
    useState,
} from 'react';

import {
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    makeStyles,
} from '@material-ui/core';
import {
    Publish as PublishIcon,
    Close as CancelIcon,
} from '@material-ui/icons';

import ReCAPTCHA from 'react-google-recaptcha';
import isEmail from 'validator/lib/isEmail';

import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import {
    recaptchaSiteKey,
} from '../constants';
import {
    selectDocumentKey,
    selectRequestStatus,
    publishDocument,
} from '../state/publishSlice';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

const Publish = (props: {
    open: boolean,
    handleClose: () => void,
}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const darkMode = useAppSelector(selectDarkMode);

    // select the current publish request status from state
    const requestStatus = useAppSelector(selectRequestStatus);
    const documentKey = useAppSelector(selectDocumentKey);

    // state for captcha verification
    const [verified, setVerified] = useState<string | null>(null);

    // state for email input
    const [email, setEmail] = useState<string>('');

    // flags for completed form
    const emailValid = isEmail(email);
    const emailError = !emailValid && Boolean(email.length);
    const formComplete = emailValid && Boolean(verified);

    const handleClose = () => {

        if (requestStatus !== 'idle') return;
        // clear state before closing
        setVerified(null);
        setEmail('');
        props.handleClose();

    };

    const handlePublish = () => {

        if (!formComplete) return;
        if (requestStatus !== 'idle') return;
        dispatch(publishDocument());

    };

    return (
        <Dialog
            className={classes.root}
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>
                Publish
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type='email'
                    label='Email'
                    color='secondary'
                    variant='filled'
                    error={emailError}
                    helperText={emailError ? 'Invalid Email' : ' '}
                />
                <ReCAPTCHA
                    theme={darkMode ? 'dark' : 'light'}
                    type='image'
                    size='compact'
                    onChange={(token) => setVerified(token)}
                    // test key for now
                    sitekey={recaptchaSiteKey}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handlePublish}
                    color='primary'
                    variant='contained'
                    startIcon={<PublishIcon />}
                    disabled={!formComplete}
                >
                    Publish
                </Button>
                <Button
                    onClick={handleClose}
                    color='secondary'
                    variant='contained'
                    startIcon={<CancelIcon />}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default Publish;
