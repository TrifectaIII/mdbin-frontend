import {
    createTheme,
    CssBaseline,
    responsiveFontSizes,
    Theme,
    ThemeOptions,
    ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MainPage from "./features/edit/EditPage";
import Header from "./features/global/components/Header";
import MenuDrawer from "./features/global/components/MenuDrawer";
import { selectDarkMode } from "./features/global/globalSlice";
import InfoPage from "./features/info/InfoPage";
import NotFoundPage from "./features/notFound/NotFoundPage";
import ViewPage from "./features/view/ViewPage";
import "./markdown/github-markdown.css";
// import CookiePermission from './features/global/components/CookiePermission';
import { useAppSelector } from "./state/hooks";

// helper function for generating themes
const createAppTheme = (options: ThemeOptions): Theme =>
    responsiveFontSizes(createTheme(options));

// set up dark and light themes
// https://material-ui.com/customization/color/#playground
const lightThemeOptions: ThemeOptions = {
    palette: {
        type: "light",
        primary: {
            main: "#e65100",
        },
        secondary: {
            main: "#794bc4",
        },
    },
};
const darkThemeOptions: ThemeOptions = {
    palette: {
        type: "dark",
        primary: {
            main: "#794bc4",
        },
        secondary: {
            main: "#e65100",
        },
    },
};

// Main App component
const App = (): JSX.Element => {
    // choose theme based on state
    const darkMode = useAppSelector(selectDarkMode);
    const lightTheme = createAppTheme(lightThemeOptions);
    const darkTheme = createAppTheme(darkThemeOptions);
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        // provider theme
        <ThemeProvider theme={theme}>
            {/* normalize css */}
            <CssBaseline />

            <Router>
                {/* include some components on every page */}
                <Header />
                <MenuDrawer />
                {/* <CookiePermission /> */}

                {/* route based on url */}
                <Switch>
                    {/* main page */}
                    <Route
                        exact
                        path="/"
                        component={MainPage}
                    />
                    <Route
                        exact
                        path="/info"
                        component={InfoPage}
                    />
                    <Route
                        exact
                        path="/view/:documentKey"
                        component={ViewPage}
                    />
                    {/* default to 404 */}
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
