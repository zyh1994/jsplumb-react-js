import defaultState from 'demo/defaultState';
export default function tabs(state, action) {
    if (state === void 0) { state = defaultState.selections; }
    switch (action.type) {
        case 'SELECTION_UPDATE':
            if (state.length === 0 && action.selections.length === 0) {
                return state;
            }
            return action.selections;
        case 'SELECTION_ADD':
            return state.concat(action.selection);
        case 'SELECTION_REMOVE':
            return state.includes(action.selection) ?
                state.filter(function (selection) { return (selection !== action.selection); }) :
                state;
        default:
            return state;
    }
}
