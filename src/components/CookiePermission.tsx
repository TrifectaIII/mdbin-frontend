import React, {
    useState,
} from 'react';

import {
    Typography,
    Grid,
    Paper,
    Button,
    ButtonGroup,
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
    grid: {

    },
    buttonGroup: {
        width: '100%',
    },
    button: {
        width: '50%',
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
                className={classes.grid}
            >
                <Grid item xs={12} md={8}>
                    <Typography
                        variant='body1'
                    >
                        This site uses the localStorage API to save your work.
                        Do you want to enable this feature?
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ButtonGroup
                        variant='contained'
                        className={classes.buttonGroup}
                    >
                        <Button
                            onClick={handleAccept}
                            startIcon={<AcceptIcon />}
                            color='primary'
                            className={classes.button}
                        >
                            Accept
                        </Button>
                        <Button
                            onClick={() => setOpen(false)}
                            startIcon={<RejectIcon />}
                            color='secondary'
                            className={classes.button}
                        >
                            Close
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Snackbar>
    );

};

export default CookiePermission;
