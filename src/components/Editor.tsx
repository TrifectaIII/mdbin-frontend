import React, {useRef} from 'react';

import {
    Grid,
    Box,
    Toolbar,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import {
    FormatBold as BoldIcon,
    FormatItalic as ItalicIcon,
} from '@material-ui/icons';

import CodeMirror, {
    ReactCodeMirrorRef,
    TransactionSpec,
} from '@uiw/react-codemirror';
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

    // current global dark mode state
    const darkMode = useAppSelector(selectDarkMode);

    // ref for codemirror component
    const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);

    // handler for updating state when text is changed
    const inputMD = useAppSelector(selectInputMD);
    const handleChange = (value: string) => dispatch(updateText(value));

    const insertBold = () => {

        if (!codeMirrorRef.current) return;
        const {view} = codeMirrorRef.current;
        if (!view) return;

        const transactionSpecs = view.state.selection.ranges.map((range) => view.state.update(
            {changes: {
                from: range.from,
                insert: '**',
            }},
            {changes: {
                from: range.to,
                insert: '**',
            }},
        ));

        const transaction = view.state.update(...transactionSpecs);
        view.dispatch(transaction);

        codeMirrorRef.current.editor?.focus();

    };

    return (
        <Box className={classes.root}>
            <Grid container>

                {/* Toolbar With helper buttons */}
                <Grid item xs={12}>
                    <Toolbar variant='dense'>
                        <IconButton size='small' onClick={insertBold}>
                            <BoldIcon />
                        </IconButton>
                        <IconButton size='small'>
                            <ItalicIcon />
                        </IconButton>
                    </Toolbar>
                </Grid>

                {/* CodeMirror */}
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
                        ref={codeMirrorRef}
                    />
                </Grid>
            </Grid>
        </Box>
    );

};

export default Editor;
