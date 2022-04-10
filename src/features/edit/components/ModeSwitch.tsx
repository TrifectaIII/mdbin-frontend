import { Button, makeStyles, Toolbar } from "@material-ui/core";
import {
    Description as PreviewIcon,
    Edit as EditorIcon,
} from "@material-ui/icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { MobileOnly } from "../../global/components/utilities";
import { selectEditMode, switchEditMode } from "../editSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-around",
    },
    button: {
        width: "50%",
        height: "100%",
        marginLeft: "5px",
        marginRight: "5px",
    },
}));

// component to switch between editor and preview on mobile
const ModeSwitch = (props: {
    innerRef: (node: HTMLDivElement | null) => void;
}): JSX.Element => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const editMode = useAppSelector(selectEditMode);

    return (
        <MobileOnly>
            <Toolbar
                className={classes.root}
                ref={props.innerRef}
                variant="dense"
                disableGutters
            >
                <Button
                    onClick={() => dispatch(switchEditMode("editor"))}
                    startIcon={<EditorIcon />}
                    color="primary"
                    variant={editMode === "editor" ? "contained" : "outlined"}
                    className={classes.button}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => dispatch(switchEditMode("preview"))}
                    startIcon={<PreviewIcon />}
                    color="secondary"
                    variant={editMode === "preview" ? "contained" : "outlined"}
                    className={classes.button}
                >
                    Preview
                </Button>
            </Toolbar>
        </MobileOnly>
    );
};

export default ModeSwitch;
