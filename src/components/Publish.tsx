import React, {
    useState,
} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    makeStyles,
} from '@material-ui/core';
import {
    Publish as PublishIcon,
    Close as CancelIcon,
} from '@material-ui/icons';
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

    const [verified, setVerified] = useState<boolean>(false);

    const handleClose = () => {

        // remove verification before closing
        setVerified(false);
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
                <DialogContentText>
                    Do you want to publish?
                </DialogContentText>
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
                    disabled={!verified}
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
