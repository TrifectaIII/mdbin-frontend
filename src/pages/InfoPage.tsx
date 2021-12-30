import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Typography,
    Container,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
    },
}));

// An information page
const InfoPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    return (
        <Container
            className={classes.root}
        >
            <Typography variant='h1'>
                Information
            </Typography>
        </Container>
    );

};

export default InfoPage;
