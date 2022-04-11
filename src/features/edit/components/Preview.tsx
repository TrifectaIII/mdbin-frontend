import { Box, Button, Grid, makeStyles, Toolbar } from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";
import React, { useState } from "react";
import RenderMarkdown from "../../../markdown/RenderMarkdown";
import { useAppSelector } from "../../../state/hooks";
import { selectDarkMode } from "../../global/globalSlice";
import Publish from "../../publish/components/Publish";
import { selectEditText } from "../editSlice";

const useStyles = makeStyles((theme) => ({
    root: {},
    text: {
        overflowY: "auto",
        paddingTop: "1rem",
    },
    button: {
        width: "100%",
        height: "100%",
        marginLeft: "5px",
        marginRight: "5px",
    },
}));

// rendered markdown preview component
const Preview = (props: {}): JSX.Element => {
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
            <Grid
                container
                className={classes.root}
            >
                <Grid
                    item
                    xs={12}
                >
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
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Toolbar
                        variant="dense"
                        disableGutters
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
                </Grid>
            </Grid>

            <Publish
                isOpen={publishOpen}
                close={closePublish}
            />
        </>
    );
};

export default Preview;
