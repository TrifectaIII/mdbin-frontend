import React, {
    useState,
} from 'react';

import {
    Typography,
    Grid,
    Paper,
    Button,
    Snackbar,
    makeStyles,
} from '@material-ui/core';
import {
    Check as AcceptIcon,
    Close as RejectIcon,
} from '@material-ui/icons';

import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    allowCookies,
    selectCookieAuth,
} from '../state/globalSlice';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    buttons: {
        width: '100%',
    },
}));

// component to ask for user cookie permission
const CookiePermission = (props: {}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const cookieAuth = useAppSelector(selectCookieAuth);

    // state to track opening
    const [open, setOpen] = useState<boolean>(!cookieAuth);

    const handleAccept = () => {

        dispatch(allowCookies());
        setOpen(false);

    };

    return (
        <Snackbar
            className={classes.root}
            open={open}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
        >
            <Grid
                container
                component={Paper}
                alignItems='center'
            >
                <Grid item xs={12} md={8}>
                    <Typography
                        variant='body1'
                    >
                        This site uses the localStorage API to save your work.
                        Do you want to enable this feature?
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        onClick={handleAccept}
                        startIcon={<AcceptIcon />}
                        color='primary'
                        variant='contained'
                        className={classes.buttons}
                    >
                        Accept
                    </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        onClick={() => setOpen(false)}
                        startIcon={<RejectIcon />}
                        color='secondary'
                        variant='contained'
                        className={classes.buttons}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        </Snackbar>
    );

};

export default CookiePermission;
