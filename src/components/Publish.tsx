import React, {
    useState,
} from 'react';

import {
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    // DialogContentText,
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
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import {
    recaptchaSiteKey,
} from '../constants';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

const Publish = (props: {
    open: boolean,
    handleClose: () => void,
}): JSX.Element => {

    const classes = useStyles();

    const darkMode = useAppSelector(selectDarkMode);

    // state for captcha verification
    const [verified, setVerified] = useState<boolean>(false);

    // state for email input
    const [email, setEmail] = useState<string>('');

    // flags for completed form
    const emailValid = isEmail(email);
    const emailError = !emailValid && Boolean(email.length);
    const formComplete = emailValid && verified;

    const handleClose = () => {

        // remove verification before closing
        setVerified(false);
        setEmail('');
        props.handleClose();

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
                    helperText={emailError ? 'Invalid Email' : ''}
                />
                <ReCAPTCHA
                    theme={darkMode ? 'dark' : 'light'}
                    type='image'
                    size='normal'
                    onChange={() => setVerified(true)}
                    // test key for now
                    sitekey={recaptchaSiteKey}
                />
            </DialogContent>
            <DialogActions>
                <Button
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
