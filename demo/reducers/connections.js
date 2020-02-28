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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import defaultState from 'demo/defaultState';
export default function connections(state, action) {
    var _a, _b;
    if (state === void 0) { state = defaultState.connections; }
    switch (action.type) {
        case 'CONNECTION_ADD':
            return __assign({}, state, (_a = {}, _a[action.connectionId] = action.connection, _a));
        case 'CONNECTION_REMOVE':
            var _c = action.connectionId, omit = state[_c], remaining = __rest(state, [typeof _c === "symbol" ? _c : _c + ""]);
            return remaining;
        case 'CONNECTION_UPDATE':
            return __assign({}, state, (_b = {}, _b[action.connectionId] = __assign({}, state[action.connectionId], action.connection), _b));
        default:
            return state;
    }
}
