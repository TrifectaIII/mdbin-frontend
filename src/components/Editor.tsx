import React, {useRef, useState} from 'react';

import {
    Grid,
    Box,
    Toolbar,
    IconButton,
    Tooltip,
    makeStyles,
} from '@material-ui/core';
import {
    FormatBold as BoldIcon,
    FormatItalic as ItalicIcon,
    FormatQuote as QuoteIcon,
    FormatListBulleted as ListBulletedIcon,
    FormatListNumbered as ListNumberedIcon,
    FormatStrikethrough as StrikethroughIcon,
    Remove as RuleIcon,
    Code as CodeIcon,
    DeleteForeverOutlined as ClearIcon,
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
import Confirm from './Confirm';
import {
    insertBold,
    insertItalic,
    clearAll,
    ApplyToView,
} from '../cmEditing';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    codeMirror: {

    },
    buttonBar: {
        justifyContent: 'center',
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

    // returns a function which applies the parameter function
    // to the view if it exists, then returns focus to the view
    const applyToView = (toApply: ApplyToView) => () => {

        if (!codeMirrorRef.current?.view) return;
        const {view} = codeMirrorRef.current;
        toApply(view);
        view.focus();

    };

    // state for clear all confirm dialog
    const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
    const openClearConfirm = () => setClearConfirmOpen(true);
    const closeClearConfirm = () => setClearConfirmOpen(false);

    // handler for clearing all text (called by Confirm)
    const handleClearAll = () => {

        if (!codeMirrorRef.current?.view) return;
        const {view} = codeMirrorRef.current;
        clearAll(view);
        // not sure why I need this timeout instead of just calling the function
        // but it doesn't work if I just call it directly.
        // this behavior doesn't occur when this function is called by
        // the button directly, so it has something to do with the
        // Confirm dialog
        setTimeout(() => view.focus(), 0);

    };

    return (
        <Box className={classes.root}>
            <Grid container>

                {/* Toolbar With helper buttons */}
                <Grid item xs={12}>
                    <Toolbar
                        variant='dense'
                        className={classes.buttonBar}
                    >
                        <Tooltip title='Bold'>
                            <IconButton size='small' onClick={applyToView(insertBold)}>
                                <BoldIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Italics'>
                            <IconButton size='small' onClick={applyToView(insertItalic)}>
                                <ItalicIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Strikethrough'>
                            <IconButton size='small'>
                                <StrikethroughIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Start Bulleted List'>
                            <IconButton size='small'>
                                <ListBulletedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Start Numbered List'>
                            <IconButton size='small'>
                                <ListNumberedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Start Block Quote'>
                            <IconButton size='small'>
                                <QuoteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Start Code Block'>
                            <IconButton size='small'>
                                <CodeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Insert Horizontal Rule'>
                            <IconButton size='small'>
                                <RuleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Clear All'>
                            <IconButton size='small' onClick={openClearConfirm}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Grid>

                {/* CodeMirror Editor */}
                <Grid item xs={12}>
                    <CodeMirror
                        theme={darkMode ? 'dark' : 'light'}
                        value={inputMD}
                        onChange={handleChange}
                        placeholder='Markdown goes here...'
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

            {/* confirm dialog for clear all button */}
            <Confirm
                open={clearConfirmOpen}
                title='Clear All'
                content='Are you sure you want to delete everything?'
                callback={handleClearAll}
                handleClose={closeClearConfirm}
            />
        </Box>
    );

};

export default Editor;
