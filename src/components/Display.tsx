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
    selectToolbarHeight,
} from '../state/globalSlice';
import {
    selectOutputHTML,
} from '../state/editSlice';
import useWindowSize from '../hooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'auto',
    },
}));

// rendered markdown display component
const Display = (props: {}): JSX.Element => {

    const classes = useStyles();

    const darkMode = useAppSelector(selectDarkMode);

    // figure out proper height of div
    const toolbarHeight = useAppSelector(selectToolbarHeight);
    const windowSize = useWindowSize();
    const [displayHeight, setDisplayHeight] = useState<number>(0);
    useEffect(() => {

        setDisplayHeight(windowSize.height - toolbarHeight);

    }, [windowSize.width, windowSize.height, toolbarHeight]);

    // display rendered HTML from state
    const outputHTML = useAppSelector(selectOutputHTML);
    const outputElement = useRef<HTMLDivElement>(null);
    useEffect(() => {

        if (outputElement.current) outputElement.current.innerHTML = outputHTML;

    }, [outputHTML]);

    return (
        <Container
            className={clsx(
                classes.root,
                'markdown-body',
                darkMode ? 'markdown-dark' : 'markdown-light',
            )}
            style={{
                height: `${displayHeight}px`,
            }}
        >
            <div ref={outputElement} />
        </Container>
    );

};

export default Display;
