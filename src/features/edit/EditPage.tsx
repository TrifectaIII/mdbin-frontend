import { Grid, Hidden, makeStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import Editor from "./components/Editor";
import ModeSwitch from "./components/ModeSwitch";
import Preview from "./components/Preview";
import { selectEditMode } from "./editSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
    },
    panelGrid: {
        flexGrow: 1,
        overflowY: "auto",
    },
    panel: {
        flexGrow: 1,
        overflowY: "auto",
        maxHeight: "100%",
    },
}));

// main editing interface
const EditPage = (props: RouteComponentProps): JSX.Element => {
    const classes = useStyles();

    const editMode = useAppSelector(selectEditMode);

    return (
        <Grid className={classes.root}>
            <ModeSwitch />
            <Grid
                container
                className={classes.panelGrid}
            >
                <Hidden
                    smDown={editMode === "preview"}
                    implementation="js"
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        className={classes.panel}
                    >
                        <Editor />
                    </Grid>
                </Hidden>
                <Hidden
                    smDown={editMode === "editor"}
                    implementation="js"
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        className={classes.panel}
                    >
                        <Preview />
                    </Grid>
                </Hidden>
            </Grid>
        </Grid>
    );
};

export default EditPage;
