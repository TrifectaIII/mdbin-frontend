import React from 'react';

import {
    Box,
    makeStyles,
} from '@material-ui/core';

// import {
//     useAppSelector,
//     useAppDispatch,
// } from '../state/hooks';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

// Template component
const Template = (props: {}): JSX.Element => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            Template Component
        </Box>
    );

};

export default Template;
