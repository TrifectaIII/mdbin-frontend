import React, {
    useState,
} from 'react';

import {
    Grid,
    Paper,
    Button,
    IconButton,
    Snackbar,
    makeStyles,
} from '@material-ui/core';
import {
    Close as CloseIcon,
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
            >
                <Grid item xs={12}>
                    <Button
                        onClick={handleAccept}
                    >
                    Accept
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <IconButton
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Snackbar>
    );

};

export default CookiePermission;
