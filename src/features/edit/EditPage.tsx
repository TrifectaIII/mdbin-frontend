import { Grid, Hidden, makeStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import Editor from "./components/Editor";
import ModeSwitch from "./components/ModeSwitch";
import Preview from "./components/Preview";
import { selectEditMode } from "./editSlice";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

// main editing interface
const EditPage = (props: RouteComponentProps<{}>): JSX.Element => {
    const classes = useStyles();

    const editMode = useAppSelector(selectEditMode);

    return (
        <Grid
            container
            direction="row"
            className={classes.root}
        >
            <Grid
                item
                xs={12}
            >
                <ModeSwitch />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <Hidden
                    smDown={editMode === "preview"}
                    implementation="css"
                >
                    <Editor />
                </Hidden>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <Hidden
                    smDown={editMode === "editor"}
                    implementation="css"
                >
                    <Preview />
                </Hidden>
            </Grid>
        </Grid>
    );
};

export default EditPage;
