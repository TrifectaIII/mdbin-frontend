import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';
import clsx from 'clsx';

import {
    Box,
    Container,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
} from '../state/hooks';
import {
    selectDarkMode,
} from '../state/globalSlice';
import infoText from '../markdown/infoText';
import {
    PlaceholderHeader,
} from '../components/Header';
import renderMD from '../markdown/renderMD';
import {
    useElementSize,
    useWindowSize,
} from '../hooks/UseSize';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'auto',
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
                    'markdown-body',
                    darkMode
                        ? 'markdown-dark'
                        : 'markdown-light',
                )}
                height={`${infoHeight}px`}
            >
                <Container>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: renderMD(infoText),
                        }}
                    />
                </Container>
            </Box>
        </>
    );

};

export default InfoPage;
