import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import NotFound from "../notFound/components/NotFound";
import ViewPending from "./components/ViewPending";
import ViewSuccess from "./components/ViewSuccess";
import {
    selectViewDocumentKey,
    selectViewRequestStatus,
    viewDocument,
} from "./viewSlice";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

// Page to view a published document
const ViewPage = (
    props: RouteComponentProps<{
        documentKey: string;
    }>,
): JSX.Element => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    // get documentKey from props
    const { documentKey } = props.match.params;

    // fetch data from state
    const requestStatus = useAppSelector(selectViewRequestStatus);
    const documentKeyState = useAppSelector(selectViewDocumentKey);

    // fetch document when needed
    useEffect(() => {
        if (
            documentKey &&
            documentKey !== documentKeyState &&
            requestStatus !== "pending" &&
            requestStatus !== "error"
        )
            dispatch(viewDocument(documentKey));
    }, [documentKey, documentKeyState, requestStatus]);

    return (
        <>
            <Box className={classes.root}>
                {requestStatus === "pending" ? <ViewPending /> : <></>}
                {requestStatus === "success" ? <ViewSuccess /> : <></>}
                {requestStatus === "error" ? (
                    <NotFound
                        type="document"
                        documentKey={documentKey}
                    />
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
};

export default ViewPage;
