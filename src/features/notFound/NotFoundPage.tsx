import React from 'react';
import {
    RouteComponentProps,
} from 'react-router-dom';

import {
    PlaceholderHeader,
} from '../global/components/Header';
import NotFound from './components/NotFound';

// 404 not found error page
const NotFoundPage = (props: RouteComponentProps<{}>): JSX.Element => (
    <>
        <PlaceholderHeader />
        <NotFound />
    </>
);

export default NotFoundPage;
