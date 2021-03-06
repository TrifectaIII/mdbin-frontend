import { Hidden } from "@material-ui/core";
import React from "react";

// wrapper components for mobile-only or desktop-only elements
export const MobileOnly = (props: {
    children: React.ReactNode;
}): JSX.Element => <Hidden mdUp>{props.children}</Hidden>;
export const DesktopOnly = (props: {
    children: React.ReactNode;
}): JSX.Element => <Hidden smDown>{props.children}</Hidden>;
