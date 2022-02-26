import React from 'react';

import {
    Box,
    TextField,
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

import {
    useAppSelector,
} from '../../../state/hooks';
import {
    selectDarkMode,
} from '../../global/globalSlice';
import {
    recaptchaSiteKey,
} from '../../../config';

const useStyles = makeStyles((theme) => ({
    content: {

    },
    actions: {

    },
}));

// form for publish modal before request is sent
const PublishForm = (props: {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    emailError: boolean,
    formComplete: boolean,
    setVerified: React.Dispatch<React.SetStateAction<string | null>>,
    handleClose: () => void,
    handlePublish: () => void,
}): JSX.Element => {

    const classes = useStyles();

    const darkMode = useAppSelector(selectDarkMode);

    return (
        <>
            <DialogContent className={classes.content}>
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <TextField
                        fullWidth
                        value={props.email}
                        onChange={(event) => props.setEmail(event.target.value)}
                        type='email'
                        label='Email'
                        color='secondary'
                        variant='filled'
                        error={props.emailError}
                        helperText={props.emailError ? 'Invalid Email' : ' '}
                    />
                    <ReCAPTCHA
                        theme={darkMode ? 'dark' : 'light'}
                        type='image'
                        size='normal'
                        onChange={(token) => props.setVerified(token)}
                        sitekey={recaptchaSiteKey}
                    />
                </Box>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    onClick={props.handlePublish}
                    color='primary'
                    variant='contained'
                    startIcon={<PublishIcon />}
                    disabled={!props.formComplete}
                >
                Publish
                </Button>
                <Button
                    onClick={props.handleClose}
                    color='secondary'
                    variant='contained'
                    startIcon={<CancelIcon />}
                >
                Cancel
                </Button>
            </DialogActions>
        </>
    );

};

export default PublishForm;
