import React, {useRef} from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    TextField,
    Box,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    selectOutputHTML,
    updateText,
} from '../state/textSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
    },
    buttons: {
        marginTop: '3rem',
    },
}));

// main index page for empty route
const MainPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const outputHTML = useAppSelector(selectOutputHTML);

    const outputElement = useRef<HTMLDivElement>(null);

    if (outputElement.current) outputElement.current.innerHTML = outputHTML;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        dispatch(updateText(event.target.value));

    };

    return (
        <Box
            alignItems='center'
            display='flex'
            flexDirection='column'
            className={classes.root}
        >
            <TextField
                variant='outlined'
                multiline
                onChange={handleChange}
            />
            <div ref={outputElement} />
        </Box>
    );

};

export default MainPage;
