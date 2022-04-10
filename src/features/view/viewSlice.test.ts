import viewReducer, { initialState, resetView, ViewState } from "./viewSlice";

describe("viewSlice", () => {
    describe("resetView", () => {
        it("should clear all state fields", () => {
            const previousState: ViewState = {
                requestStatus: "success",
                documentKey: "123",
                text: "abc",
                published: 1,
            };
            expect(viewReducer(previousState, resetView())).toEqual(
                initialState,
            );
        });

        it("should not alter default state", () => {
            expect(viewReducer(initialState, resetView())).toEqual(
                initialState,
            );
        });
    });
});
