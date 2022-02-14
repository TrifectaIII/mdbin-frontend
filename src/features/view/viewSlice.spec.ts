import viewReducer, {
    ViewState,
    resetView,
} from './viewSlice';

test('resetView should reset all fields', () => {

    const previousState: ViewState = {
        requestStatus: 'success',
        documentKey: '123',
        text: 'abc',
        published: 1,
    };
    expect(viewReducer(previousState, resetView())).toEqual({
        requestStatus: 'idle',
        documentKey: null,
        text: null,
        published: null,
    });

});
