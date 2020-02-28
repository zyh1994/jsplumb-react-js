export var onSelectionUpdate = function (selections) { return ({
    selections: selections,
    type: 'SELECTION_UPDATE'
}); };
export var onSelectionAdd = function (selection) { return ({
    selection: selection,
    type: 'SELECTION_ADD'
}); };
export var onSelectionRemove = function (selection) { return ({
    selection: selection,
    type: 'SELECTION_REMOVE'
}); };
