import React from 'react';
import clsx from 'clsx';

import {
    Button,
    Toolbar,
    Grid,
    Container,
    makeStyles,
} from '@material-ui/core';
import {
    Publish as PublishIcon,
} from '@material-ui/icons';

import {
    useAppSelector,
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import {
    selectEditMode,
    selectEditText,
} from '../state/editSlice';
import renderMD from '../markdown/renderMD';
import {
    useElementSize,
} from '../hooks/UseSize';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    text: {
        overflowY: 'auto',
    },
    button: {
        width: '100%',
        height: '100%',
        marginLeft: '5px',
        marginRight: '5px',
    },
}));

// rendered markdown preview component
const Preview = (props: {
    verticalSpace: number,
}): JSX.Element => {

    const classes = useStyles();

    // global dark mode determines markdown styling
    const darkMode = useAppSelector(selectDarkMode);

    // get text from the editor
    const editText = useAppSelector(selectEditText);

    // height of preview can take the rest of the screen
    // pass mode as a dependency so the size updates properly
    const editMode = useAppSelector(selectEditMode);
    const [buttonSize, buttonRef] = useElementSize(editMode);
    const previewHeight = props.verticalSpace - buttonSize.height;


    return (
        <>
            <Grid
                container
                className={classes.root}
            >
                <Grid item xs={12}>
                    <Container
                        className={clsx(
                            classes.text,
                            'markdown-body',
                            darkMode
                                ? 'markdown-dark'
                                : 'markdown-light',
                        )}
                        style={{
                            height: `${previewHeight}px`,
                        }}
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: renderMD(editText),
                            }}
                        />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Toolbar
                        ref={buttonRef}
                        variant='dense'
                        disableGutters
                        style={{
                            // colors match github css style
                            backgroundColor: darkMode
                                ? '#0d1117'
                                : '#ffffff',
                        }}
                    >
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            startIcon={<PublishIcon />}
                        >
                            Publish
                        </Button>
                    </Toolbar>
                </Grid>
            </Grid>
        </>
    );

};

export default Preview;
