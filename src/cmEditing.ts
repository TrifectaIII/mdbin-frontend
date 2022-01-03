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

// Insert bolding characters around all selections
export const insertBold = (view: EditorView): void => {

    const toInsert = '**';

    const spec: TransactionSpec = view.state.changeByRange((range) => {

        const iterable = view.state.doc.iterRange(range.from, range.to);
        while (!iterable.done) {

            console.log(iterable.value, iterable.done, iterable.lineBreak);
            iterable.next();
            if (iterable.done) console.log(iterable.value, iterable.done, iterable.lineBreak);

        }

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

// Insert italic characters around all selections
export const insertItalic = (view: EditorView): void => {

    const toInsert = '*';

    const spec: TransactionSpec = view.state.changeByRange((range) => {

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

// insert the first line of a bulleted list
export const insertBulletedList = (view: EditorView): void => {

    const toInsert = '\n- ';

    const spec: TransactionSpec = view.state.changeByRange((range) => {

        const rangeObj = range.toJSON() as RangeObject;
        rangeObj.anchor = Math.max(rangeObj.anchor, rangeObj.head) + toInsert.length;
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

// undo an event
export const undoEvent = (view: EditorView): boolean => historyUndo({
    state: view.state,
    dispatch: view.dispatch,
});

// redo a previously undone event
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
