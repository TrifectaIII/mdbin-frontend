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
    CircularProgress,
    makeStyles,
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
    // selectViewPublished,
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
    centered: {
        marginTop: '30vh',
        textAlign: 'center',
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
    // const published = useAppSelector(selectViewPublished);

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
            className={clsx(
                classes.root,
                'markdown-body',
                darkMode
                    ? 'markdown-dark'
                    : 'markdown-light',
            )}
            height={`${viewHeight}px`}
        >
            <Container>
                <RenderMarkdown md={text || ''} />
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
            <Container className={classes.centered}>
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
