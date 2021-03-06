import {
    AppBar,
    Box,
    Button,
    IconButton,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import {
    ArrowDropDown as ExpandIcon,
    Brightness3 as MoonIcon,
    Brightness7 as SunIcon,
    Menu as MenuIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navMap } from "../../../Navigation";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { openMenuDrawer, selectDarkMode, toggleDarkMode } from "../globalSlice";
import { DesktopOnly, MobileOnly } from "./utilities";

const useStyles = makeStyles((theme) => ({
    root: {},
    white: {
        color: theme.palette.common.white,
    },
    textcolor: {
        color: theme.palette.text.primary,
    },
    noDec: {
        textDecoration: "none",
    },
    rightSide: {
        marginLeft: "auto",
    },
    spaceRight: {
        marginRight: "1rem",
    },
    navButton: {
        color: theme.palette.common.white,
        textTransform: "none",
        marginRight: "1rem",
    },
}));

// Main page header for navigation, global state
const Header = (): JSX.Element => {
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const darkMode = useAppSelector(selectDarkMode);

    // Generate state for any nav group menus
    const states: {
        [key: string]: {
            value: (EventTarget & HTMLSpanElement) | null;
            setter: React.Dispatch<
                React.SetStateAction<(EventTarget & HTMLSpanElement) | null>
            >;
        };
    } = {};
    Object.entries(navMap).forEach(([name, point]) => {
        if ("children" in point) {
            const [value, setter] = useState<
                (EventTarget & HTMLSpanElement) | null
            >(null);
            states[name] = {
                value,
                setter,
            };
        }
    });

    // Generate navitems jsx from navmap
    const navItems: JSX.Element[] = [];
    Object.entries(navMap).forEach(([name, point]) => {
        if ("route" in point)
            navItems.push(
                <Link
                    to={point.route}
                    key={name}
                    className={clsx(classes.white, classes.noDec)}
                >
                    <Button
                        className={classes.navButton}
                        startIcon={<point.icon />}
                    >
                        <Typography variant="body1">{name}</Typography>
                    </Button>
                </Link>,
            );
        else
            navItems.push(
                <React.Fragment key={name}>
                    <Button
                        onClick={(event) =>
                            states[name].setter(event.currentTarget)
                        }
                        className={classes.navButton}
                    >
                        <point.icon className={classes.spaceRight} />
                        <Typography variant="body1">{name}</Typography>
                        <ExpandIcon />
                    </Button>

                    <Menu
                        getContentAnchorEl={null}
                        anchorEl={states[name].value}
                        open={Boolean(states[name].value)}
                        onClose={() => states[name].setter(null)}
                        elevation={0}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        keepMounted
                    >
                        {Object.entries(point.children).map(
                            ([cName, cPoint]) => (
                                <Link
                                    to={cPoint.route}
                                    key={cName}
                                    className={clsx(
                                        classes.noDec,
                                        classes.textcolor,
                                    )}
                                >
                                    <MenuItem
                                        onClick={() =>
                                            states[name].setter(null)
                                        }
                                    >
                                        <ListItemIcon>
                                            <cPoint.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={cName} />
                                    </MenuItem>
                                </Link>
                            ),
                        )}
                    </Menu>
                </React.Fragment>,
            );
    });

    return (
        <AppBar
            position="sticky"
            className={classes.root}
        >
            <Toolbar>
                <MobileOnly>
                    <IconButton
                        edge="start"
                        className={classes.white}
                        onClick={() => dispatch(openMenuDrawer())}
                    >
                        <MenuIcon color="inherit" />
                    </IconButton>
                </MobileOnly>

                <Link
                    to="/"
                    className={clsx(classes.noDec, classes.white)}
                >
                    <Button className={classes.navButton}>
                        <Typography variant="h5">mdbin</Typography>
                    </Button>
                </Link>

                <DesktopOnly>
                    <Box display="flex">{navItems}</Box>
                </DesktopOnly>

                {/* right side */}
                <Tooltip
                    title={darkMode ? "Light Mode" : "Dark Mode"}
                    className={classes.rightSide}
                >
                    <IconButton
                        edge="end"
                        className={classes.white}
                        onClick={() => dispatch(toggleDarkMode())}
                    >
                        {darkMode ? <SunIcon /> : <MoonIcon />}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
