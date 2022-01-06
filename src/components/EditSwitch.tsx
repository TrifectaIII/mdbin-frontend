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
    selectMobileSwitch,
    switchToEditor,
    switchToPreview,
    setSwitchHeight,
} from '../state/editSlice';
import {
    MobileOnly,
} from './utilities';
import useWindowSize from '../hooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    button: {
        width: '50%',
    },
}));

// rendered markdown display component
const EditSwitch = (props: {}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const mobileSwitch = useAppSelector(selectMobileSwitch);

    const windowSize = useWindowSize();
    const switchRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

        dispatch(setSwitchHeight(switchRef.current?.offsetHeight || 0));

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
            >
                <Button
                    onClick={() => dispatch(switchToEditor())}
                    startIcon={<EditorIcon />}
                    color='primary'
                    variant={
                        mobileSwitch === 'editor'
                            ? 'contained'
                            : 'text'
                    }
                    className={classes.button}
                >
                Edit
                </Button>
                <Button
                    onClick={() => dispatch(switchToPreview())}
                    startIcon={<PreviewIcon />}
                    color='secondary'
                    variant={
                        mobileSwitch === 'preview'
                            ? 'contained'
                            : 'text'
                    }
                    className={classes.button}
                >
                Preview
                </Button>
            </Toolbar>
        </MobileOnly>
    );

};

export default EditSwitch;
