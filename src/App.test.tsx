import React from 'react';

import {
    render,
    screen,
} from '@testing-library/react';
import {
    Provider,
} from 'react-redux';
import {
    MemoryRouter,
} from 'react-router-dom';
import {
    rest,
} from 'msw';
import {
    setupServer,
} from 'msw/node';

import {
    apiEndpoint,
} from './constants';
import {
    store,
} from './state/store';
import App from './App';

// create mock server for requests
export const handlers = [
    rest.get(
        `${apiEndpoint}`,
        (req, res, ctx) => {

            console.log(req);
            return res(ctx.json({
                text: 'TestDocumentContents',
                published: 1,
            }));

        },
    ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done
afterAll(() => server.close());


describe('viewPage', () => {

    it('should fetch an existing document', async () => {

        render(<Provider store={store}>
            <MemoryRouter initialEntries={['/view/abc']}>
                <App />
            </MemoryRouter>
        </Provider>);

        expect(await screen.findByText('TestDocumentContents', {exact: false})).
            toBeInTheDocument();

    });

});
