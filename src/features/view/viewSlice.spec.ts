import viewReducer, {
    ViewState,
    initialState,
    resetView,
} from './viewSlice';

describe('viewSlice', () => {

    describe('resetView', () => {

        it('should clear all state fields', () => {

            const previousState: ViewState = {
                requestStatus: 'success',
                documentKey: '123',
                text: 'abc',
                published: 1,
            };
            expect(viewReducer(previousState, resetView())).
                toEqual({
                    requestStatus: 'idle',
                    documentKey: null,
                    text: null,
                    published: null,
                });

        });

        it('should not alter default state', () => {

            expect(viewReducer(initialState, resetView())).
                toEqual(initialState);

        });

    });

});
