import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    Typography,
    Container,
    makeStyles,
    Link,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
    },
}));

// An information page
const InfoPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    return (
        <Container
            className={classes.root}
        >
            <Typography variant='h1'>
                Information
            </Typography>
            <hr />
            <Link
                href='https://www.markdownguide.org/cheat-sheet/'
                color='secondary'
            >
                <Typography variant='h3'>
                    Markdown Cheatsheet
                </Typography>
            </Link>
            <Typography variant='body1'>
                All of the basic syntax and some of the extended syntax will work.
                Try things out!
            </Typography>
        </Container>
    );

};

export default InfoPage;
