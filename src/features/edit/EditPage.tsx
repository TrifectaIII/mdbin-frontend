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
} from '../../state/hooks';
import {
    selectEditMode,
} from './editSlice';

import Editor from './components/Editor';
import Preview from './components/Preview';
import ModeSwitch from './components/ModeSwitch';
import {
    PlaceholderHeader,
} from '../global/components/Header';
import {
    useElementSize,
    useWindowSize,
} from '../../hooks/UseSize';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

// main editing interface
const EditPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    const editMode = useAppSelector(selectEditMode);

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
                        smDown={editMode === 'preview'}
                        implementation='css'
                    >
                        <Editor
                            verticalSpace={verticalSpace}
                        />
                    </Hidden>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Hidden
                        smDown={editMode === 'editor'}
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

export default EditPage;