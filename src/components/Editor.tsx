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
import {
    insertAroundSelections,
} from '../editing';

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

        if (codeMirrorRef.current?.view) {

            const {view} = codeMirrorRef.current;
            view.dispatch(insertAroundSelections(view, '**'));

        }

    };

    const insertItalic = () => {

        if (codeMirrorRef.current?.view) {

            const {view} = codeMirrorRef.current;
            view.dispatch(insertAroundSelections(view, '*'));

        }

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
                        <IconButton size='small' onClick={insertItalic}>
                            <ItalicIcon />
                        </IconButton>
                    </Toolbar>
                </Grid>

                {/* CodeMirror Editor */}
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
