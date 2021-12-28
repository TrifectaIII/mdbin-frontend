import React, {useRef, useEffect} from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Box,
    makeStyles,
} from '@material-ui/core';

import CodeMirror from '@uiw/react-codemirror';
import {
    markdown,
    markdownLanguage,
} from '@codemirror/lang-markdown';
import {
    languages,
} from '@codemirror/language-data';

import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import {
    selectOutputHTML,
    updateText,
} from '../state/textSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
    },
    buttons: {
        marginTop: '3rem',
    },
}));

// main index page for empty route
const MainPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const darkMode = useAppSelector(selectDarkMode);

    // handler for updating state when text is changed
    const handleChange = (value: string) => dispatch(updateText(value));

    // display rendered HTML from state
    const outputHTML = useAppSelector(selectOutputHTML);
    const outputElement = useRef<HTMLDivElement>(null);
    useEffect(() => {

        if (outputElement.current) outputElement.current.innerHTML = outputHTML;

    }, [outputHTML]);


    return (
        <Box
            alignItems='center'
            display='flex'
            flexDirection='column'
            className={classes.root}
        >
            <CodeMirror
                theme={darkMode ? 'dark' : 'light'}
                onChange={handleChange}
                extensions={[
                    markdown({
                        base: markdownLanguage,
                        codeLanguages: languages,
                    }),
                ]}
            />
            <div ref={outputElement} />
        </Box>
    );

};

export default MainPage;