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
export default function connections(state, action) {
    var _a, _b;
    if (state === void 0) { state = defaultState.sources; }
    switch (action.type) {
        case 'CONNECTION_ADD':
            return __assign({}, state, (_a = {}, _a[action.sourceId] = (state[action.sourceId] || []).concat([
                action.connectionId
            ]), _a));
        case 'CONNECTION_REMOVE':
            console.log(action.sourceId); // tslint:disable-line:no-console
            console.log(action.connectionId); // tslint:disable-line:no-console
            return __assign({}, state, (_b = {}, _b[action.sourceId] = state[action.sourceId].filter(function (connectionId) { return (connectionId !== action.connectionId); }), _b));
        default:
            return state;
    }
}
