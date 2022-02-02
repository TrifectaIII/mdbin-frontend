import React from 'react';

import {
    Container,
    CircularProgress,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '30vh',
        textAlign: 'center',
    },
}));

// pending display for viewing documents
const ViewPending = (props: {}): JSX.Element => {

    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <CircularProgress />
        </Container>
    );

};

export default ViewPending;
