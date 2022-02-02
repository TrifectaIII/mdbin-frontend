import React, {
    useEffect,
} from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Box,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
    useAppDispatch,
} from '../../state/hooks';
import {
    selectViewRequestStatus,
    selectViewDocumentKey,
    viewDocument,
} from './viewSlice';
import {
    PlaceholderHeader,
} from '../global/components/Header';
import NotFound from '../notFound/components/NotFound';
import ViewPending from './components/ViewPending';
import ViewSuccess from './components/ViewSuccess';
import {
    useElementSize,
    useWindowSize,
} from '../../hooks/UseSize';


const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

// Page to view a published document
const ViewPage = (props: RouteComponentProps<{
    documentKey: string,
}>): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    // get documentKey from props
    const {documentKey} = props.match.params;

    // fetch data from state
    const requestStatus = useAppSelector(selectViewRequestStatus);
    const documentKeyState = useAppSelector(selectViewDocumentKey);

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

    return (
        <>
            <PlaceholderHeader innerRef={headerRef} />
            <Box className={classes.root}>
                {requestStatus === 'pending' ? <ViewPending /> : <></>}
                {
                    requestStatus === 'success'
                        ? <ViewSuccess height={viewHeight} />
                        : <></>
                }
                {
                    requestStatus === 'error'
                        ? <NotFound
                            type='document'
                            documentKey={documentKey}
                        />
                        : <></>
                }
            </Box>
        </>
    );

};

export default ViewPage;
