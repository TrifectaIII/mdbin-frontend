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
    clearAll,
    insertAroundSelections,
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

    // handler for inserting bolding characters
    const insertBold = () => {

        if (!codeMirrorRef.current?.view) return;
        const {view} = codeMirrorRef.current;
        view.dispatch(insertAroundSelections(view, '**'));

    };

    // handler for inserting italics characters
    const insertItalic = () => {

        if (!codeMirrorRef.current?.view) return;
        const {view} = codeMirrorRef.current;
        view.dispatch(insertAroundSelections(view, '*'));

    };

    const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
    const openClearConfirm = () => setClearConfirmOpen(true);
    const closeClearConfirm = () => setClearConfirmOpen(false);

    // handler for clearing all text (called by Confirm)
    const handleClearAll = () => {

        if (!codeMirrorRef.current?.view) return;
        const {view} = codeMirrorRef.current;
        view.dispatch(clearAll(view));

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
                            <IconButton size='small' onClick={insertBold}>
                                <BoldIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Italics'>
                            <IconButton size='small' onClick={insertItalic}>
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
            <Confirm
                open={clearConfirmOpen}
                title='Clear All'
                content='Are you sure you want to clear all text?'
                callBack={handleClearAll}
                handleClose={closeClearConfirm}
            />
        </Box>
    );

};

export default Editor;
