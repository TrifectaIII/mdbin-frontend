import { IconButton, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import {
    Code as CodeIcon,
    DeleteForeverOutlined as ClearIcon,
    FormatBold as BoldIcon,
    FormatItalic as ItalicIcon,
    FormatListBulleted as ListBulletedIcon,
    FormatListNumbered as ListNumberedIcon,
    FormatQuote as QuoteIcon,
    FormatStrikethrough as StrikethroughIcon,
    Link as LinkIcon,
    Redo as RedoIcon,
    Remove as RuleIcon,
    Undo as UndoIcon,
} from "@material-ui/icons";
import { EditorView } from "@uiw/react-codemirror";
import React from "react";
import {
    insertBlockQuote,
    insertBold,
    insertBulletedList,
    insertCodeBlock,
    insertHorizontalRule,
    insertItalic,
    insertLink,
    insertNumberedList,
    insertStrikethrough,
    redoEvent,
    undoEvent,
} from "../../../markdown/mdEditing";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "space-around",
    },
}));

// markdown editor component
const EditorButtons = (props: {
    applyToView: (toApply: (view: EditorView) => void) => () => void;
    clearAllFunc: () => void;
    innerRef?: (node: HTMLDivElement | null) => void;
}): JSX.Element => {
    const classes = useStyles();

    return (
        <Toolbar
            variant="dense"
            className={classes.root}
            ref={props.innerRef}
        >
            <Tooltip title="Bold">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertBold)}
                >
                    <BoldIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Italics">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertItalic)}
                >
                    <ItalicIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Strikethrough">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertStrikethrough)}
                >
                    <StrikethroughIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Start Bulleted List">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertBulletedList)}
                >
                    <ListBulletedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Start Numbered List">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertNumberedList)}
                >
                    <ListNumberedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Start Block Quote">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertBlockQuote)}
                >
                    <QuoteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Start Code Block">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertCodeBlock)}
                >
                    <CodeIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Insert Link">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertLink)}
                >
                    <LinkIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Insert Horizontal Rule">
                <IconButton
                    size="small"
                    onClick={props.applyToView(insertHorizontalRule)}
                >
                    <RuleIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Undo">
                <IconButton
                    size="small"
                    onClick={props.applyToView(undoEvent)}
                >
                    <UndoIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Redo">
                <IconButton
                    size="small"
                    onClick={props.applyToView(redoEvent)}
                >
                    <RedoIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Clear All">
                <IconButton
                    size="small"
                    onClick={props.clearAllFunc}
                    // style={{
                    //     color: 'red',
                    // }}
                >
                    <ClearIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

export default EditorButtons;
