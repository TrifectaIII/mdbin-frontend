import React, {
    useState,
} from 'react';
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
} from '../../../state/hooks';
import {
    selectDarkMode,
} from '../../global/globalSlice';
import {
    selectEditMode,
    selectEditText,
} from '../editSlice';
import Publish from '../../publish/components/Publish';
import RenderMarkdown from '../../../markdown/RenderMarkdown';
import {
    useElementSize,
} from '../../../hooks/UseSize';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    text: {
        overflowY: 'auto',
        paddingTop: '1rem',
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

    const [publishOpen, setPublishOpen] = useState<boolean>(false);
    const openPublish = () => setPublishOpen(true);
    const closePublish = () => setPublishOpen(false);

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
                        <RenderMarkdown md={editText} />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Toolbar
                        ref={buttonRef}
                        variant='dense'
                        disableGutters
                        style={{
                            // colors match github markdown style
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
                            onClick={openPublish}
                        >
                            Publish
                        </Button>
                    </Toolbar>
                </Grid>
            </Grid>

            <Publish
                isOpen={publishOpen}
                close={closePublish}
            />
        </>
    );

};

export default Preview;
