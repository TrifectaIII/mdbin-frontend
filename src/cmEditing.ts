import {
    EditorView,
    SelectionRange,
    Transaction,
    TransactionSpec,
} from '@uiw/react-codemirror';

// Insert a string before all selections
export const insertBeforeSelections = (view: EditorView, toInsert: string): Transaction => {

    const spec: TransactionSpec = view.state.changeByRange((range) => ({
        range: range.extend(range.from, range.to + toInsert.length),
        changes: {
            from: range.from,
            insert: toInsert,
        },
    }));

    return view.state.update(spec);

};

// Insert a string after all selections
export const insertAfterSelections = (view: EditorView, toInsert: string): Transaction => {

    const spec: TransactionSpec = view.state.changeByRange((range) => ({
        range: range.extend(range.from, range.to + toInsert.length),
        changes: {
            from: range.to,
            insert: toInsert,
        },
    }));

    return view.state.update(spec);

};

// Insert a string around all selections
export const insertAroundSelections = (view: EditorView, toInsert: string): Transaction => {

    const spec: TransactionSpec = view.state.changeByRange((range) => {

        const rangeObj = range.toJSON() as {
            anchor: number,
            head: number,
        };
        rangeObj.anchor += toInsert.length;
        rangeObj.head += toInsert.length;

        return {
            // range: range.extend(range.from + toInsert.length, range.to + toInsert.length),
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

    return view.state.update(spec);

};

// export const insertAtSelectionsLineStart = (view: EditorView, toInsert: string): Transaction => {

// };

// clear all text from the editor
export const clearAll = (view: EditorView): Transaction => view.state.update({
    changes: {
        from: 0,
        to: view.state.doc.length,
    },
});
