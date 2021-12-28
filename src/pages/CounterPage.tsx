import React, {useState} from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    ButtonGroup,
    Button,
    Typography,
    TextField,
    Box,
    Grid,
    makeStyles,
} from '@material-ui/core';

import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from '../state/counterSlice';

const useStyles = makeStyles((_theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem',
    },
    button404: {
        textDecoration: 'none',
        marginTop: '3rem',
    },
    numInput: {
        marginBottom: '1rem',
    },
    fullWidth: {
        width: '100%',
    },
}));

// Simple counter app to demo a page connected to state slice
const CounterPage = (props: RouteComponentProps<{}>): JSX.Element => {

    const classes = useStyles();

    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    const [incrementAmount, setIncrementAmount] = useState('2');
    const incrementValue = Number(incrementAmount) || 0;

    return (
        <Box className={classes.root}>

            <Grid
                container
                justify='center'
                alignItems='center'
            >
                <Grid item xs={1}>
                    <Button
                        onClick={() => dispatch(decrement())}
                        className={classes.fullWidth}
                        color='secondary'
                        variant='contained'
                    >
                        -
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Typography
                        align='center'
                        variant='h1'
                    >
                        {count}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        onClick={() => dispatch(increment())}
                        className={classes.fullWidth}
                        color='primary'
                        variant='contained'
                    >
                        +
                    </Button>
                </Grid>
            </Grid>

            <TextField
                value={incrementAmount}
                onChange={(event) => setIncrementAmount(event.target.value)}
                variant='outlined'
                className={classes.numInput}
            />

            <ButtonGroup variant='contained'>
                <Button
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </Button>
                <Button
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </Button>
                <Button
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}
                >
                    Add If Odd
                </Button>
            </ButtonGroup>
        </Box>
    );

};

export default CounterPage;
