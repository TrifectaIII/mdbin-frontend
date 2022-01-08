/* eslint-disable no-magic-numbers */
import {
    EditorView,
    SelectionRange,
    TransactionSpec,
} from '@uiw/react-codemirror';
import {
    undo as historyUndo,
    redo as historyRedo,
} from '@codemirror/history';

interface RangeObject {
    anchor: number
    head: number
}

const insertAroundSelections = (view: EditorView, toInsert: string): void => {

    const spec: TransactionSpec = view.state.changeByRange((range) => {

        // const iterable = view.state.doc.iterRange(range.from, range.to);
        // while (!iterable.done) {

        //     console.log(iterable.value, iterable.done, iterable.lineBreak);
        //     iterable.next();
        //     if (iterable.done) console.log(iterable.value, iterable.done, iterable.lineBreak);

        // }

        const rangeObj = range.toJSON() as RangeObject;
        rangeObj.anchor += toInsert.length;
        rangeObj.head += toInsert.length;

        return {
            range: SelectionRange.fromJSON(rangeObj),
            changes: [
                {
                    from: range.from,
                    insert: toInsert,
                },
                {
                    from: range.to,
                    insert: toInsert,
                },
            ],
        };

    });

    view.dispatch(spec);

};

const insertAfterSelections = (
    view: EditorView,
    toInsert: string,
    selectOffset = 0,
): void => {

    const spec: TransactionSpec = view.state.changeByRange((range) => {

        const rangeObj = range.toJSON() as RangeObject;
        rangeObj.anchor =
            Math.max(rangeObj.anchor, rangeObj.head) + toInsert.length + selectOffset;
        rangeObj.head = rangeObj.anchor;

        return {
            range: SelectionRange.fromJSON(rangeObj),
            changes: [
                {
                    from: range.to,
                    insert: toInsert,
                },
            ],
        };

    });

    view.dispatch(spec);

};

// Insert bolding characters
export const insertBold =
    (view: EditorView): void => insertAroundSelections(view, '**');

// Insert italic characters
export const insertItalic =
    (view: EditorView): void => insertAroundSelections(view, '*');

// insert strikethrough characters
export const insertStrikethrough =
    (view: EditorView): void => insertAroundSelections(view, '~~');

// insert the first line of a bulleted list
export const insertBulletedList =
    (view: EditorView): void => insertAfterSelections(view, '\n- ');

// insert the first line of a numbered list
export const insertNumberedList =
    (view: EditorView): void => insertAfterSelections(view, '\n1. ');

// insert the first line of a block quote
export const insertBlockQuote =
    (view: EditorView): void => insertAfterSelections(view, '\n> ');

// insert the first line of a code block
export const insertCodeBlock =
    (view: EditorView): void => insertAfterSelections(view, '\n\t');

// insert the bounding characters for a link
export const insertLink =
    (view: EditorView): void => insertAfterSelections(view, '[]()', -3);

// insert the first line of a code block
export const insertHorizontalRule =
    (view: EditorView): void => insertAfterSelections(view, '\n\n---\n\n');

// execute an undo
export const undoEvent = (view: EditorView): boolean => historyUndo({
    state: view.state,
    dispatch: view.dispatch,
});

// execute a redo
export const redoEvent = (view: EditorView): boolean => historyRedo({
    state: view.state,
    dispatch: view.dispatch,
});

// clear all text from the editor
export const clearAll = (view: EditorView): void => view.dispatch({
    changes: {
        from: 0,
        to: view.state.doc.length,
    },
});
