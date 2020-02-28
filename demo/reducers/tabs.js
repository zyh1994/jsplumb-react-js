var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import defaultState from 'demo/defaultState';
import uuidv4 from 'uuid/v4';
var tabDefaults = {
    deepStateRedirect: true,
    params: {
        title: 'New Tab',
        type: 'dynamic'
    },
    sticky: true
};
export default function tabs(state, action) {
    if (state === void 0) { state = defaultState.tabs; }
    switch (action.type) {
        case 'TAB_ADD':
            return state.concat([__assign({}, tabDefaults, action.tab, { name: action.tab.name || uuidv4() })]);
        case 'TAB_REMOVE':
            return typeof action.index === 'number' && state[action.index] ?
                state.filter(function (tab, index) { return (index !== action.index); }) :
                state;
        default:
            return state;
    }
}
