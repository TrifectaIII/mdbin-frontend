import React from 'react';

import {
    Grid,
    Box,
    Toolbar,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import {
    FormatBold as BoldIcon,
} from '@material-ui/icons';

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
    updateText,
} from '../state/textSlice';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    codeMirror: {

    },
    buttons: {

    },
}));

// markdown editor component
const Editor = (props: {}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const darkMode = useAppSelector(selectDarkMode);

    // handler for updating state when text is changed
    const inputMD = useAppSelector(selectInputMD);
    const handleChange = (value: string) => dispatch(updateText(value));

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Toolbar variant='dense'>
                        <IconButton
                            size='small'
                        >
                            <BoldIcon />
                        </IconButton>
                    </Toolbar>
                </Grid>
                <Grid item xs={12}>
                    <CodeMirror
                        theme={darkMode ? 'dark' : 'light'}
                        value={inputMD}
                        onChange={handleChange}
                        extensions={[
                            markdown({
                                base: markdownLanguage,
                                codeLanguages: languages,
                            }),
                        ]}
                        className={classes.codeMirror}
                    />
                </Grid>
            </Grid>
        </Box>
    );

};

export default Editor;
