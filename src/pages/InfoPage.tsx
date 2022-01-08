import DOMPurify from 'dompurify';
import {
    marked,
} from 'marked';

import React, {
    useRef,
    useEffect,
} from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';
import clsx from 'clsx';

import {
    Box,
    Container,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import infoText from '../markdown/infoText';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    container: {

    },
}));

// An information page
const InfoPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    const darkMode = useAppSelector(selectDarkMode);

    // render markdown into html
    const infoHTML = DOMPurify.sanitize(marked.parse(infoText));

    // drop html into element and resize
    const infoRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        if (infoRef.current) infoRef.current.innerHTML = infoHTML;

    }, [infoRef.current]);

    return (
        <Box
            className={clsx(
                classes.root,
                'markdown-body',
                darkMode
                    ? 'markdown-dark'
                    : 'markdown-light',
            )}
        >
            <Container
                ref={infoRef}
                className={classes.container}
            >
            </Container>
        </Box>
    );

};

export default InfoPage;
