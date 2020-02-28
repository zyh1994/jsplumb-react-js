import defaultState from 'demo/defaultState';
var debug = function (state, action) {
    if (state === void 0) { state = defaultState.debug; }
    switch (action.type) {
        case 'DEBUG':
            return typeof action.value === 'undefined' || action.value === null ?
                !state :
                action.value;
        default:
            return state;
    }
};
export default debug;
