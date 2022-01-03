import {
    EditorView,
    SelectionRange,
    TransactionSpec,
} from '@uiw/react-codemirror';

export type ApplyToView = (view: EditorView) => void;

// Insert bolding characters around all selections
export const insertBold = (view: EditorView): void => {

    const toInsert = '**';

    const spec: TransactionSpec = view.state.changeByRange((range) => {

        const rangeObj = range.toJSON() as {
            anchor: number,
            head: number,
        };
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

    view.dispatch(view.state.update(spec));

};

// Insert italic characters around all selections
export const insertItalic = (view: EditorView): void => {

    const toInsert = '*';

    const spec: TransactionSpec = view.state.changeByRange((range) => {

        const rangeObj = range.toJSON() as {
            anchor: number,
            head: number,
        };
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

    view.dispatch(view.state.update(spec));

};

// clear all text from the editor
export const clearAll = (view: EditorView): void => view.dispatch(view.state.update({
    changes: {
        from: 0,
        to: view.state.doc.length,
    },
}));
