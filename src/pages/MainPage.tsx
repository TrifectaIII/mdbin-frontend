import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Grid,
    makeStyles,
} from '@material-ui/core';

import Editor from '../components/Editor';
import Display from '../components/Display';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

// main index page for empty route
const MainPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    return (
        <Grid
            container
            direction='row'
            className={classes.root}
        >
            <Grid item xs={12} md={6}>
                <Editor />
            </Grid>
            <Grid item xs={12} md={6}>
                <Display />
            </Grid>
        </Grid>
    );

};

export default MainPage;
