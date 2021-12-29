import React, {useRef, useEffect} from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Container,
    Grid,
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
    selectInputMD,
    selectOutputHTML,
    updateText,
} from '../state/textSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: '3rem',
    },
    input: {

    },
    output: {

    },
}));

// main index page for empty route
const MainPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const darkMode = useAppSelector(selectDarkMode);

    // handler for updating state when text is changed
    const inputMD = useAppSelector(selectInputMD);
    const handleChange = (value: string) => dispatch(updateText(value));

    // display rendered HTML from state
    const outputHTML = useAppSelector(selectOutputHTML);
    const outputElement = useRef<HTMLDivElement>(null);
    useEffect(() => {

        if (outputElement.current) outputElement.current.innerHTML = outputHTML;

    }, [outputHTML]);


    return (
        <Grid
            container
            direction='row'
            className={classes.root}
        >
            <Grid
                item
                xs={12}
                md={6}
            >
                <CodeMirror
                    height='200px'
                    theme={darkMode ? 'dark' : 'light'}
                    value={inputMD}
                    onChange={handleChange}
                    extensions={[
                        markdown({
                            base: markdownLanguage,
                            codeLanguages: languages,
                        }),
                    ]}
                    className={classes.input}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <Container
                    ref={outputElement}
                    className={classes.output}
                ><div></div></Container>
            </Grid>
        </Grid>
    );

};

export default MainPage;
