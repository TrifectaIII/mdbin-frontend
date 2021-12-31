import {
    EditorView,
    Transaction,
    TransactionSpec,
} from '@uiw/react-codemirror';

// Insert a string around all selections
export const insertAroundSelections = (view: EditorView, toInsert: string): Transaction => {

    const spec: TransactionSpec = view.state.changeByRange((range) => ({
        range: range.extend(range.from, range.to + (toInsert.length * 2)),
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
    }));

    return view.state.update(spec);

};

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

// export const insertAtSelectionsLineStart = (view: EditorView, toInsert: string): Transaction => {

// };
