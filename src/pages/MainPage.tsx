import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Button,
    ButtonGroup,
    Typography,
    Box,
    makeStyles,
} from '@material-ui/core';
import {
    Apps as AppsIcon,
    Error as ErrorIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
    },
    buttons: {
        marginTop: '3rem',
    },
}));

// main index page for empty route
const MainPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

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
                React-ReduxTK-Router-MUI-TS Template
            </Typography>
            <ButtonGroup
                variant='contained'
                className={classes.buttons}
            >
                {/* buttons which function as links */}
                <Button
                    onClick={() => props.history.push('/counter')}
                    color='primary'
                >
                    <AppsIcon />Counter App
                </Button>
                <Button
                    onClick={() => props.history.push('/nonexistent')}
                    color='secondary'
                >
                    <ErrorIcon />Test 404 Page
                </Button>
            </ButtonGroup>
        </Box>
    );

};

export default MainPage;
