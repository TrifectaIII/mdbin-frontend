import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useElementSize, useWindowSize } from "../../hooks/UseSize";
import infoText from "../../markdown/infoText";
import RenderMarkdown from "../../markdown/RenderMarkdown";
import { useAppSelector } from "../../state/hooks";
import { PlaceholderHeader } from "../global/components/Header";
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

    // determine height of main element
    const windowSize = useWindowSize();
    const [headerSize, headerRef] = useElementSize();
    const infoHeight = windowSize.height - headerSize.height;

    return (
        <>
            <PlaceholderHeader innerRef={headerRef} />
            <Box
                className={classes.root}
                height={`${infoHeight}px`}
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
