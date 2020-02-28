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
export default function nodes(state, action) {
    var _a, _b;
    if (state === void 0) { state = defaultState.nodes; }
    switch (action.type) {
        case 'NODE_ADD':
            return __assign({}, state, (_a = {}, _a[action.nodeId] = action.node, _a));
        case 'NODE_REMOVE':
            var _c = action.nodeId, omit = state[_c], remaining = __rest(state, [typeof _c === "symbol" ? _c : _c + ""]);
            return remaining;
        case 'NODE_UPDATE':
            return __assign({}, state, (_b = {}, _b[action.nodeId] = __assign({}, state[action.nodeId], action.node, { style: __assign({}, state[action.nodeId].style, action.node.style) }), _b));
        default:
            return state;
    }
}
