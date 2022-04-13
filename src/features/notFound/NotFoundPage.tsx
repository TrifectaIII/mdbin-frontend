import React from "react";
import { RouteComponentProps } from "react-router-dom";
import NotFound from "./components/NotFound";

// 404 not found error page
const NotFoundPage = (props: RouteComponentProps): JSX.Element => (
    <NotFound type="page" />
);

export default NotFoundPage;
