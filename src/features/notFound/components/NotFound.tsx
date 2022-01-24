import React from 'react';
import {
    useHistory,
    useLocation,
} from 'react-router-dom';

import {
    Typography,
    ButtonGroup,
    Button,
    Box,
    makeStyles,
} from '@material-ui/core';
import {
    ArrowBack as BackIcon,
    Home as HomeIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
    },
    topGap: {
        marginTop: '3rem',
    },
    route: {
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        padding: '0.5rem',
        borderRadius: '0.5rem',
    },
}));

// component to switch between editor and preview on mobile
const NotFound = (props: {

}): JSX.Element => {

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    return (
        <Box
            alignItems='center'
            display='flex'
            flexDirection='column'
            className={classes.root}
        >
            <Typography
                variant='h2'
                align='center'
            >
        404: Not Found
            </Typography>
            <Typography
                variant='body1'
                align='center'
                className={classes.topGap}
            >
                <code className={classes.route}>
                    {location.pathname}
                </code> could not be found.
            </Typography>
            <ButtonGroup
                variant='contained'
                className={classes.topGap}
            >
                {/* buttons which function as links */}
                <Button onClick={history.goBack} color='secondary'>
                    <BackIcon /> Back
                </Button>
                <Button onClick={() => history.push('/')} color='primary'>
                    <HomeIcon /> Home
                </Button>
            </ButtonGroup>

        </Box>
    );

};

export default NotFound;
