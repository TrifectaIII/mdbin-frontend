import publishReducer, {
    PublishState,
    initialState,
    resetPublish,
} from './publishSlice';

describe('publishSlice', () => {

    describe('resetPublish', () => {

        it('should clear all state fields', () => {

            const previousState: PublishState = {
                requestStatus: 'success',
                errorMessage: 'incorrect',
                documentKey: '123',
            };
            expect(publishReducer(previousState, resetPublish())).
                toEqual(initialState);

        });

        it('should not alter default state', () => {

            expect(publishReducer(initialState, resetPublish())).
                toEqual(initialState);

        });

    });

});
