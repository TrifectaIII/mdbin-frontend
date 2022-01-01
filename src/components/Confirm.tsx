import React from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    makeStyles,
} from '@material-ui/core';
import {
    Check as YesIcon,
    Clear as NoIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

const Confirm = (props: {
    open: boolean,
    title: string,
    content: string,
    callBack: () => void,
    handleClose: () => void,
}): JSX.Element => {

    const classes = useStyles();

    const handleYes = () => {

        props.callBack();
        props.handleClose();

    };

    return (
        <Dialog
            className={classes.root}
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleYes}
                    color='primary'
                    variant='contained'
                    startIcon={<YesIcon />}
                >
                    Yes
                </Button>
                <Button
                    onClick={props.handleClose}
                    color='secondary'
                    variant='contained'
                    startIcon={<NoIcon />}
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default Confirm;
