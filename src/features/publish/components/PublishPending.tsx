import React from 'react';

import {
    DialogContent,
    CircularProgress,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
}));

// display for publish modal when request is pending
const PublishPending = (props: {}): JSX.Element => {

    const classes = useStyles();

    return (
        <DialogContent className={classes.root}>
            <CircularProgress />
        </DialogContent>
    );

};

export default PublishPending;
