import React, {
    useState,
} from 'react';
import {
    useLocation,
} from 'react-router-dom';
import clsx from 'clsx';

import {
    Box,
    Container,
    Typography,
    makeStyles,
    Button,
    Tooltip,
} from '@material-ui/core';

import {
    useAppSelector,
} from '../../../state/hooks';
import {
    selectDarkMode,
} from '../../global/globalSlice';
import {
    selectViewText,
    selectViewPublished,
} from '../viewSlice';
import RenderMarkdown from '../../../markdown/RenderMarkdown';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'auto',
    },
    main: {
        paddingTop: '2rem',
    },
    util: {

    },
    text: {
        paddingTop: '1rem',
    },
}));

// time in ms to keep tooltip open on copy button
const TOOLTIP_TIMEOUT = 1000;

// view a published document after successful fetch
const ViewSuccess = (props: {
    height: number,
}): JSX.Element => {

    const classes = useStyles();

    const location = useLocation();

    const darkMode = useAppSelector(selectDarkMode);

    // fetch data from state
    const text = useAppSelector(selectViewText);
    const published = useAppSelector(selectViewPublished);
    const publishedDate = published
        ? new Date(published).toLocaleString()
        : 'Unavailable';

    // state & handler for copy button
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const [timeoutID, setTimeoutID] = useState<number>();
    const handleCopy = () => {

        // string to copy
        const toCopy = window.location.origin + location.pathname;

        // add to clipboard
        navigator.clipboard.writeText(toCopy);

        // open tooltip
        setTooltipOpen(true);
        // clear old timeout & create new one
        clearTimeout(timeoutID);
        setTimeoutID(window.setTimeout(() => {

            setTooltipOpen(false);
            // eslint-disable-next-line no-undefined
            setTimeoutID(undefined);

        }, TOOLTIP_TIMEOUT));

    };

    // content when document is loaded
    return (
        <Box
            className={classes.root}
            height={`${props.height}px`}
            style={{
                // colors match github markdown style
                backgroundColor: darkMode
                    ? '#0d1117'
                    : '#ffffff',
            }}
        >
            <Container className={classes.main}>
                <Box
                    className={classes.util}
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                >
                    <Typography
                        variant='body2'
                        align='center'
                    >
                        Published: {publishedDate}
                    </Typography>
                    <Tooltip
                        open={tooltipOpen}
                        title='Copied!'
                        placement='bottom'
                        arrow
                    >
                        <Button
                            variant='contained'
                            color='secondary'
                            style={{
                                margin: 'auto',
                                marginTop: '1rem',
                            }}
                            onClick={handleCopy}
                        >
                        Copy Link
                        </Button>
                    </Tooltip>
                </Box>
                <RenderMarkdown
                    md={text || ''}
                    className={clsx(
                        classes.text,
                        'markdown-body',
                        darkMode
                            ? 'markdown-dark'
                            : 'markdown-light',
                    )}
                />
            </Container>
        </Box>
    );

};

export default ViewSuccess;