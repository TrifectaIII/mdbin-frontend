import React from 'react';
import clsx from 'clsx';

import {
    Container,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import {
    selectText,
} from '../state/editSlice';
import renderMD from '../markdown/renderMD';

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'auto',
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
    const text = useAppSelector(selectText);

    // height of preview can take the rest of the screen
    const previewHeight = props.verticalSpace;


    return (
        <Container
            className={clsx(
                classes.root,
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
                    __html: renderMD(text),
                }}
            />
        </Container>
    );

};

export default Preview;
