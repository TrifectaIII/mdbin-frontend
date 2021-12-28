import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

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
        marginTop: '3rem',
    },
}));

// An empty template page component
const TemplatePage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    return (
        <Box
            className={classes.root}
        >
            Template Page
        </Box>
    );

};

export default TemplatePage;
