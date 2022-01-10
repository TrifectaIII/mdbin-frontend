import React, {
    useRef,
    useState,
} from 'react';

import {
    Grid,
    makeStyles,
} from '@material-ui/core';

import CodeMirror, {
    EditorView,
    ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import {
    markdown,
    markdownLanguage,
} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';

import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import {
    selectEditText,
    selectEditMode,
    updateEditText,
} from '../state/editSlice';
import EditorButtons from './EditorButtons';
import Confirm from './Confirm';
import {
    useElementSize,
} from '../hooks/UseSize';
import {
    clearAll,
} from '../markdown/mdEditing';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    codeMirrorGrid: {

    },
    buttonBar: {
        justifyContent: 'space-around',
    },
}));

// markdown editor component
const Editor = (props: {
    verticalSpace: number,
}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    // current global dark mode state
    const darkMode = useAppSelector(selectDarkMode);

    // ref for codemirror component
    const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);

    // text from state & update handler
    const editText = useAppSelector(selectEditText);
    const handleChange = (value: string) => dispatch(updateEditText(value));

    // calculate height of codemirror editor
    // pass mode as a dependency so the size updates properly
    const editMode = useAppSelector(selectEditMode);
    const [buttonsSize, buttonsRef] = useElementSize(editMode);
    const editorHeight = props.verticalSpace - buttonsSize.height;

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
        setTimeout(() => view.focus());

    };

    // returns a function which applies the input function
    // to the view if it exists, then returns focus to the view
    const applyToView = (toApply: (view: EditorView) => void) => () => {

        if (!codeMirrorRef.current?.view) return;
        const {view} = codeMirrorRef.current;
        toApply(view);
        view.focus();

    };

    return (
        <>
            <Grid container className={classes.root}>

                {/* Toolbar With helper buttons */}
                <Grid item xs={12}>
                    <EditorButtons
                        applyToView={applyToView}
                        clearAllFunc={openClearConfirm}
                        innerRef={buttonsRef}
                    />
                </Grid>

                {/* CodeMirror Editor */}
                <Grid
                    item xs={12}
                    className={classes.codeMirrorGrid}
                >
                    <CodeMirror
                        theme={darkMode ? 'dark' : 'light'}
                        height={`${editorHeight}px`}
                        value={editText}
                        onChange={handleChange}
                        placeholder='Markdown goes here...'
                        extensions={[
                            markdown({
                                base: markdownLanguage,
                                codeLanguages: languages,
                            }),
                            EditorView.lineWrapping,
                        ]}
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
        </>
    );

};

export default Editor;
