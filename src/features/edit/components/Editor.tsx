import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { Box, makeStyles } from "@material-ui/core";
import CodeMirror, {
    EditorView,
    ReactCodeMirrorRef,
} from "@uiw/react-codemirror";
import React, { useRef, useState } from "react";
import { clearAll } from "../../../markdown/mdEditing";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import Confirm from "../../global/components/Confirm";
import { selectDarkMode } from "../../global/globalSlice";
import { selectEditText, updateEditText } from "../editSlice";
import EditorButtons from "./EditorButtons";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
        height: "100%",
    },
    codeMirrorBox: {
        flexGrow: 1,
        overflowY: "auto",
    },
}));

// markdown editor component
const Editor = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    // current global dark mode state
    const darkMode = useAppSelector(selectDarkMode);

    // ref for codemirror component
    const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);

    // text from state & update handler
    const editText = useAppSelector(selectEditText);
    const handleChange = (value: string) => dispatch(updateEditText(value));

    // state for clear all confirm dialog
    const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
    const openClearConfirm = () => setClearConfirmOpen(true);
    const closeClearConfirm = () => setClearConfirmOpen(false);

    // handler for clearing all text (called by Confirm)
    const handleClearAll = () => {
        if (!codeMirrorRef.current?.view) return;
        const { view } = codeMirrorRef.current;
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
        const { view } = codeMirrorRef.current;
        toApply(view);
        view.focus();
    };

    // puts focus on codemirror editor
    const focusEditor = () => {
        if (!codeMirrorRef.current?.view) return;
        const { view } = codeMirrorRef.current;
        view.focus();
    };

    return (
        <>
            <Box
                className={classes.root}
                style={{
                    backgroundColor: darkMode ? "#282c34" : "#fafafa",
                }}
                onClick={focusEditor}
            >
                {/* Toolbar With helper buttons */}
                <EditorButtons
                    applyToView={applyToView}
                    clearAllFunc={openClearConfirm}
                />

                {/* CodeMirror Editor */}
                <Box className={classes.codeMirrorBox}>
                    <CodeMirror
                        theme={darkMode ? "dark" : "light"}
                        value={editText}
                        onChange={handleChange}
                        placeholder="Markdown goes here..."
                        extensions={[
                            markdown({
                                base: markdownLanguage,
                                codeLanguages: languages,
                            }),
                            EditorView.lineWrapping,
                        ]}
                        ref={codeMirrorRef}
                    />
                </Box>
            </Box>

            {/* confirm dialog for clear all button */}
            <Confirm
                open={clearConfirmOpen}
                title="Clear All"
                content="Are you sure you want to delete everything?"
                callback={handleClearAll}
                handleClose={closeClearConfirm}
            />
        </>
    );
};

export default Editor;
