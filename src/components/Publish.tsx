import React, {
    useState,
    useEffect,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';

import {
    Box,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
    makeStyles,
} from '@material-ui/core';
import {
    Publish as PublishIcon,
    Close as CancelIcon,
    Refresh as ResetIcon,
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
    resetPublish,
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
    const history = useHistory();

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
        dispatch(publishDocument(email));

    };

    // content when request is idle (not sent yet)
    const idleContent = <>
        <DialogContent>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
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
                    size='normal'
                    onChange={(token) => setVerified(token)}
                    sitekey={recaptchaSiteKey}
                />
            </Box>
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
    </>;

    // content when request is pending (loading circle)
    const pendingContent = <DialogContent>
        <CircularProgress />
    </DialogContent>;

    // content when request has failed
    const errorContent = <DialogContent>
        <DialogContentText>
            Error: Publish Request Failed.
        </DialogContentText>
        <DialogActions>
            <Button
                onClick={() => dispatch(resetPublish())}
                color='primary'
                variant='contained'
                startIcon={<ResetIcon />}
            >
                Publish
            </Button>
        </DialogActions>
    </DialogContent>;

    // redirect when publish request is complete
    useEffect(() => {

        if (requestStatus !== 'success') return;
        if (!documentKey) return;
        history.push(`view/${documentKey}`);

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
            {requestStatus === 'idle' ? idleContent : <></>}
            {requestStatus === 'pending' ? pendingContent : <></>}
            {requestStatus === 'error' ? errorContent : <></>}
        </Dialog>
    );

};

export default Publish;
