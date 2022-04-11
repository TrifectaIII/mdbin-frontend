import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import infoText from "../../markdown/infoText";
import RenderMarkdown from "../../markdown/RenderMarkdown";
import { useAppSelector } from "../../state/hooks";
import { selectDarkMode } from "../global/globalSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: "auto",
        paddingTop: "2rem",
    },
}));

// An information page
const InfoPage = (props: RouteComponentProps<{}>): JSX.Element => {
    const classes = useStyles();

    const darkMode = useAppSelector(selectDarkMode);

    return (
        <>
            <Box
                className={classes.root}
                style={{
                    // colors match github markdown style
                    backgroundColor: darkMode ? "#0d1117" : "#ffffff",
                }}
            >
                <RenderMarkdown
                    md={infoText}
                    darkMode={darkMode}
                />
            </Box>
        </>
    );
};

export default InfoPage;
