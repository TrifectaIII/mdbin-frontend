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
    selectMode,
} from '../state/editSlice';

import Editor from '../components/Editor';
import Preview from '../components/Preview';
import ModeSwitch from '../components/ModeSwitch';
import {
    PlaceholderHeader,
} from '../components/Header';
import {
    useElementSize,
    useWindowSize,
} from '../hooks/UseSize';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

// main index page for empty route
const MainPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    const mode = useAppSelector(selectMode);

    // size of window & components
    const windowSize = useWindowSize();
    const [switchSize, switchRef] = useElementSize();
    const [headerSize, headerRef] = useElementSize();

    const verticalSpace =
        windowSize.height - (switchSize.height + headerSize.height);

    return (
        <>
            {/* placeholder header for offsets */}
            <PlaceholderHeader
                innerRef={headerRef}
            />

            {/* main contents */}
            <Grid
                container
                direction='row'
                className={classes.root}
            >
                <Grid item xs={12}>
                    <ModeSwitch
                        innerRef={switchRef}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Hidden
                        smDown={mode === 'preview'}
                        implementation='css'
                    >
                        <Editor
                            verticalSpace={verticalSpace}
                        />
                    </Hidden>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Hidden
                        smDown={mode === 'editor'}
                        implementation='css'
                    >
                        <Preview
                            verticalSpace={verticalSpace}
                        />
                    </Hidden>
                </Grid>
            </Grid>
        </>
    );

};

export default MainPage;
