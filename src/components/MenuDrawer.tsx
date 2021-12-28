import React from 'react';
import {Link} from 'react-router-dom';

import {
    Box,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    makeStyles,
} from '@material-ui/core';
import {
    ArrowRightAlt as InnerIcon,
} from '@material-ui/icons';

import {navMap} from '../Navigation';
import {MobileOnly} from './utilities';
import {
    useAppSelector,
    useAppDispatch,
} from '../state/hooks';
import {
    selectMenuDrawerOpen,
    openMenuDrawer,
    closeMenuDrawer,
} from '../state/globalSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1rem',
    },
    linkText: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    inactive: {
        color: theme.palette.text.secondary,
    },
    hidden: {
        color: theme.palette.background.paper,
    },
}));

// drawer for navigation on mobile view
const MenuDrawer = (props: {}): JSX.Element => {

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const open = useAppSelector(selectMenuDrawerOpen);

    // Generate navitems jsx from navmap
    const navItems: JSX.Element[] = [];
    Object.entries(navMap).
        forEach(([name, point], index) => {

            if ('route' in point) {

                navItems.push(<Link
                    to={point.route}
                    key={name}
                    className={classes.linkText}
                    onClick={() => dispatch(closeMenuDrawer())}
                >
                    <ListItem>
                        <ListItemIcon>
                            <point.icon />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                </Link>);

            } else {

                navItems.push(<ListItem
                    key={name}
                    className={classes.inactive}
                >
                    <ListItemIcon className={classes.inactive}>
                        <point.icon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItem>);

                Object.entries(point.children).
                    forEach(([cName, cPoint]) => {

                        navItems.push(<Link
                            to={cPoint.route}
                            key={cName}
                            className={classes.linkText}
                            onClick={() => dispatch(closeMenuDrawer())}
                        >
                            <ListItem>
                                <ListItemIcon>
                                    <InnerIcon className={classes.hidden}/>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <cPoint.icon />
                                </ListItemIcon>
                                <ListItemText primary={cName} />
                            </ListItem>
                        </Link>);

                    });

            }

            // add a divider it its not the last point
            if (index < Object.keys(navMap).length - 1) {

                navItems.push(<Divider key={`div${index}`} />);

            }

        });

    return (
        <MobileOnly>
            <SwipeableDrawer
                anchor='left'
                open={open}
                onOpen={() => dispatch(openMenuDrawer())}
                onClose={() => dispatch(closeMenuDrawer())}
            >
                <Box className={classes.root}>
                    <List>
                        {navItems}
                    </List>
                </Box>
            </SwipeableDrawer>
        </MobileOnly>
    );

};

export default MenuDrawer;
