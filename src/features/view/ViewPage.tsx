import React, {
    useEffect,
} from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';
import clsx from 'clsx';

import {
    Box,
    Container,
    Typography,
    CircularProgress,
    makeStyles,
    Button,
} from '@material-ui/core';

import {
    useAppSelector,
    useAppDispatch,
} from '../../state/hooks';
import {
    selectDarkMode,
} from '../global/globalSlice';
import {
    selectViewRequestStatus,
    selectViewDocumentKey,
    selectViewText,
    selectViewPublished,
    viewDocument,
} from './viewSlice';
import {
    PlaceholderHeader,
} from '../global/components/Header';
import NotFound from '../notFound/components/NotFound';
import RenderMarkdown from '../../markdown/RenderMarkdown';
import {
    useElementSize,
    useWindowSize,
} from '../../hooks/UseSize';


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

// Page to view a published document
const ViewPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const darkMode = useAppSelector(selectDarkMode);

    // get documentKey from props
    const {documentKey} = props.match.params as {documentKey: string};

    // fetch data from state
    const requestStatus = useAppSelector(selectViewRequestStatus);
    const documentKeyState = useAppSelector(selectViewDocumentKey);
    const text = useAppSelector(selectViewText);
    const published = useAppSelector(selectViewPublished);
    const publishedDate = new Date(published || 0).toLocaleString();

    // fetch document when needed
    useEffect(() => {

        if (
            documentKey &&
            documentKey !== documentKeyState &&
            requestStatus !== 'pending' &&
            requestStatus !== 'error'
        ) dispatch(viewDocument(documentKey));

    }, [documentKey, documentKeyState, requestStatus]);

    // determine height of main element
    const windowSize = useWindowSize();
    const [headerSize, headerRef] = useElementSize();
    const viewHeight = windowSize.height - headerSize.height;

    // content when document is loaded
    const successContent = <>
        <Box
            className={classes.root}
            height={`${viewHeight}px`}
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
                    <Button
                        variant='contained'
                        color='primary'
                        style={{
                            margin: 'auto',
                        }}
                    >
                        Copy Link
                    </Button>
                    <Typography
                        variant='body2'
                        align='center'
                    >
                        Published: {publishedDate}
                    </Typography>
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
    </>;

    // content when document has failed to load
    const errorContent = <>
        <Box className={classes.root}>
            <NotFound
                type='document'
                documentKey={documentKey}
            />
        </Box>
    </>;

    // content when document is loaded
    const pendingContent = <>
        <Box className={classes.root}>
            <Container
                style={{
                    marginTop: '30vh',
                    textAlign: 'center',
                }}
            >
                <CircularProgress />
            </Container>
        </Box>
    </>;

    return (
        <>
            <PlaceholderHeader innerRef={headerRef} />
            {requestStatus === 'success' ? successContent : <></>}
            {requestStatus === 'pending' ? pendingContent : <></>}
            {requestStatus === 'error' ? errorContent : <></>}
        </>
    );

};

export default ViewPage;
