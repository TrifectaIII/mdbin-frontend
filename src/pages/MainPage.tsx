import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Grid,
    Hidden,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
} from '../state/hooks';
import {
    selectMobileSwitch,
} from '../state/editSlice';

import Editor from '../components/Editor';
import Preview from '../components/Preview';
import EditSwitch from '../components/EditSwitch';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

// main index page for empty route
const MainPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    const mobileSwitch = useAppSelector(selectMobileSwitch);

    return (
        <Grid
            container
            direction='row'
            className={classes.root}
        >
            <Grid item xs={12}>
                <EditSwitch />
            </Grid>
            <Grid item xs={12} md={6}>
                <Hidden
                    smDown={mobileSwitch === 'preview'}
                    implementation='css'
                >
                    <Editor />
                </Hidden>
            </Grid>
            <Grid item xs={12} md={6}>
                <Hidden
                    smDown={mobileSwitch === 'editor'}
                    implementation='css'
                >
                    <Preview />
                </Hidden>
            </Grid>
        </Grid>
    );

};

export default MainPage;
