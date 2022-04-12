import { CircularProgress, Container, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
    },
}));

// pending display for viewing documents
const ViewPending = (): JSX.Element => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <CircularProgress />
        </Container>
    );
};

export default ViewPending;
