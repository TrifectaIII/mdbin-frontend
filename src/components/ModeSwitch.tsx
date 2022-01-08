import React, {
    useRef,
    useEffect,
} from 'react';

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
    selectModeSwitch,
    switchModeToEditor,
    switchModeToPreview,
    setModeSwitchHeight,
} from '../state/editSlice';
import {
    MobileOnly,
} from './utilities';
import {
    useWindowSize,
} from '../hooks/UseSize';

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
const ModeSwitch = (props: {}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const mobileSwitch = useAppSelector(selectModeSwitch);

    const windowSize = useWindowSize();
    const switchRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        dispatch(setModeSwitchHeight(switchRef.current?.offsetHeight || 0));

    }, [
        windowSize.width,
        windowSize.height,
        switchRef.current,
    ]);

    return (
        <MobileOnly>
            <Toolbar
                className={classes.root}
                ref={switchRef}
                variant='dense'
                disableGutters
            >
                <Button
                    onClick={() => dispatch(switchModeToEditor())}
                    startIcon={<EditorIcon />}
                    color='primary'
                    variant={
                        mobileSwitch === 'editor'
                            ? 'contained'
                            : 'outlined'
                    }
                    className={classes.button}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => dispatch(switchModeToPreview())}
                    startIcon={<PreviewIcon />}
                    color='secondary'
                    variant={
                        mobileSwitch === 'preview'
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
