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
export default function diagrams(state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (state === void 0) { state = defaultState.diagrams; }
    switch (action.type) {
        case 'DIAGRAM_ADD':
            return __assign({}, state, (_a = {}, _a[action.diagramId] = action.diagram, _a));
        case 'DIAGRAM_REMOVE':
            var _j = action.diagramId, omit = state[_j], remaining = __rest(state, [typeof _j === "symbol" ? _j : _j + ""]);
            return remaining;
        case 'DIAGRAM_SET_XYSCALE':
            return __assign({}, state, (_b = {}, _b[action.diagramId] = __assign({}, state[action.diagramId], { scale: action.scale, xOffset: action.xOffset, yOffset: action.yOffset }), _b));
        case 'DIAGRAM_SET_SCALE':
            return __assign({}, state, (_c = {}, _c[action.diagramId] = __assign({}, state[action.diagramId], { scale: action.scale }), _c));
        case 'DIAGRAM_SET_XYOFFSET':
            return __assign({}, state, (_d = {}, _d[action.diagramId] = __assign({}, state[action.diagramId], { xOffset: action.xOffset, yOffset: action.yOffset }), _d));
        case 'DIAGRAM_SET_XOFFSET':
            return __assign({}, state, (_e = {}, _e[action.diagramId] = __assign({}, state[action.diagramId], { xOffset: action.xOffset }), _e));
        case 'DIAGRAM_SET_YOFFSET':
            return __assign({}, state, (_f = {}, _f[action.diagramId] = __assign({}, state[action.diagramId], { yOffset: action.yOffset }), _f));
        case 'NODE_ADD':
            return __assign({}, state, (_g = {}, _g[action.diagramId] = __assign({}, state[action.diagramId], { nodes: state[action.diagramId].nodes.concat([
                    action.nodeId
                ]) }), _g));
        case 'NODE_REMOVE':
            return __assign({}, state, (_h = {}, _h[action.diagramId] = __assign({}, state[action.diagramId], { nodes: state[action.diagramId].nodes.filter(function (node) { return (node.toString() !== action.nodeId); }) }), _h));
        default:
            return state;
    }
}
