import React, {
    useRef,
    useEffect,
} from 'react';

import {
    Container,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
} from '../state/hooks';
import {
    selectOutputHTML,
} from '../state/editSlice';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    codeMirror: {

    },
    buttons: {

    },
}));

// rendered markdown display component
const Display = (props: {}): JSX.Element => {

    const classes = useStyles();

    // display rendered HTML from state
    const outputHTML = useAppSelector(selectOutputHTML);
    const outputElement = useRef<HTMLDivElement>(null);
    useEffect(() => {

        if (outputElement.current) outputElement.current.innerHTML = outputHTML;

    }, [outputHTML]);

    return (
        <Container
            className={classes.root}
        >
            <div ref={outputElement} />
        </Container>
    );

};

export default Display;
