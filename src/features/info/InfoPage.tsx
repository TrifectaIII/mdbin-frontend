import { Box, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
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
        overflow: "auto",
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
                className={clsx(
                    classes.root,
                    "markdown-body",
                    darkMode ? "markdown-dark" : "markdown-light",
                )}
                height={`${infoHeight}px`}
            >
                <Container>
                    <RenderMarkdown md={infoText} />
                </Container>
            </Box>
        </>
    );
};

export default InfoPage;
