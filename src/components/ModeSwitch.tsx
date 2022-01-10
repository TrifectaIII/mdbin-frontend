import React from 'react';

import {
    Toolbar,
    Button,
    makeStyles,
} from '@material-ui/core';
import {
    Edit as EditorIcon,
    Description as PreviewIcon,
} from '@material-ui/icons';

import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    selectEditMode,
    switchEditMode,
} from '../state/editSlice';
import {
    MobileOnly,
} from './utilities';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    button: {
        width: '50%',
        height: '100%',
        marginLeft: '5px',
        marginRight: '5px',
    },
}));

// component to switch between editor and preview on mobile
const ModeSwitch = (props: {
    innerRef: (node: HTMLDivElement| null) => void,
}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const editMode = useAppSelector(selectEditMode);

    return (
        <MobileOnly>
            <Toolbar
                className={classes.root}
                ref={props.innerRef}
                variant='dense'
                disableGutters
            >
                <Button
                    onClick={() => dispatch(switchEditMode('editor'))}
                    startIcon={<EditorIcon />}
                    color='primary'
                    variant={
                        editMode === 'editor'
                            ? 'contained'
                            : 'outlined'
                    }
                    className={classes.button}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => dispatch(switchEditMode('preview'))}
                    startIcon={<PreviewIcon />}
                    color='secondary'
                    variant={
                        editMode === 'preview'
                            ? 'contained'
                            : 'outlined'
                    }
                    className={classes.button}
                >
                    Preview
                </Button>
            </Toolbar>
        </MobileOnly>
    );

};

export default ModeSwitch;
