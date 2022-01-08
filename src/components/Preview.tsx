import React, {
    useRef,
    useEffect,
    useState,
} from 'react';
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
    selectHeaderHeight,
} from '../state/globalSlice';
import {
    selectOutputHTML,
    selectModeSwitchHeight,
} from '../state/editSlice';
import {
    useWindowSize,
} from '../hooks/UseSize';

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'auto',
    },
}));

// rendered markdown preview component
const Preview = (props: {}): JSX.Element => {

    const classes = useStyles();

    const darkMode = useAppSelector(selectDarkMode);

    // figure out proper height of div
    const headerHeight = useAppSelector(selectHeaderHeight);
    const switchHeight = useAppSelector(selectModeSwitchHeight);
    const windowSize = useWindowSize();
    const [previewHeight, setPreviewHeight] = useState<number>(0);
    useEffect(() => {

        setPreviewHeight(windowSize.height - headerHeight - switchHeight);

    }, [
        windowSize.width,
        windowSize.height,
        headerHeight,
        switchHeight,
    ]);

    // display rendered HTML from state
    const outputHTML = useAppSelector(selectOutputHTML);
    const outputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        if (outputRef.current) outputRef.current.innerHTML = outputHTML;

    }, [outputHTML, outputRef.current]);

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
            <div ref={outputRef} />
        </Container>
    );

};

export default Preview;
