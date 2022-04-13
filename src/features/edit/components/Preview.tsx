import { Box, Button, makeStyles, Toolbar } from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";
import React, { useState } from "react";
import RenderMarkdown from "../../../markdown/RenderMarkdown";
import { useAppSelector } from "../../../state/hooks";
import { selectDarkMode } from "../../global/globalSlice";
import Publish from "../../publish/components/Publish";
import { selectEditText } from "../editSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
        height: "100%",
    },
    text: {
        // uncomment to fix publish button at bottom
        // overflowY: "auto",
        paddingTop: "1rem",
        flexGrow: 1,
    },
    buttonBar: { padding: "6px" },
    button: {
        width: "100%",
        height: "100%",
    },
}));

// rendered markdown preview component
const Preview = (): JSX.Element => {
    const classes = useStyles();

    // global dark mode determines markdown styling
    const darkMode = useAppSelector(selectDarkMode);

    // get text from the editor
    const editText = useAppSelector(selectEditText);

    const [publishOpen, setPublishOpen] = useState<boolean>(false);
    const openPublish = () => setPublishOpen(true);
    const closePublish = () => setPublishOpen(false);

    return (
        <>
            <Box className={classes.root}>
                <Box
                    className={classes.text}
                    style={{
                        // colors match github markdown style
                        backgroundColor: darkMode ? "#0d1117" : "#ffffff",
                    }}
                >
                    <RenderMarkdown
                        md={editText}
                        darkMode={darkMode}
                    />
                </Box>
                <Toolbar
                    variant="dense"
                    disableGutters
                    className={classes.buttonBar}
                    style={{
                        // colors match github markdown style
                        backgroundColor: darkMode ? "#0d1117" : "#ffffff",
                    }}
                >
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        startIcon={<PublishIcon />}
                        onClick={openPublish}
                    >
                        Publish
                    </Button>
                </Toolbar>
            </Box>

            <Publish
                isOpen={publishOpen}
                close={closePublish}
            />
        </>
    );
};

export default Preview;
