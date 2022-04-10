import editReducer, {
    EditState,
    switchEditModeAction,
    updateEditTextAction,
} from "./editSlice";

describe("editSlice", () => {
    describe("updateEditTextAction", () => {
        it("should update the text field", () => {
            const previousState: EditState = {
                text: "goodbye",
                mode: "editor",
            };
            expect(
                editReducer(previousState, updateEditTextAction("hello")),
            ).toEqual({
                text: "hello",
                mode: "editor",
            });
        });
    });

    describe("switchEditModeAction", () => {
        it("should update the mode", () => {
            const previousState: EditState = {
                text: "goodbye",
                mode: "editor",
            };
            expect(
                editReducer(previousState, switchEditModeAction("preview")),
            ).toEqual({
                text: "goodbye",
                mode: "preview",
            });
        });
    });
});
