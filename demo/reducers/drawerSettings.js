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
export default function drawerSettings(state, action) {
    if (state === void 0) { state = defaultState.drawerSettings; }
    switch (action.type) {
        case 'DRAWER_DOCK':
            return __assign({}, state, { docked: typeof action.docked === 'undefined' ||
                    action.docked === null ?
                    !state.docked :
                    action.docked });
        case 'DRAWER_DRAG':
            return __assign({}, state, { drag: typeof action.drag === 'undefined' ||
                    action.drag === null ?
                    !state.drag :
                    action.drag });
        case 'DRAWER_HOVER':
            return __assign({}, state, { hover: typeof action.hover === 'undefined' ||
                    action.hover === null ?
                    !state.hover :
                    action.hover });
        case 'DRAWER_OPEN':
            return __assign({}, state, { open: typeof action.open === 'undefined' ||
                    action.open === null ?
                    !state.open :
                    action.open });
        case 'DRAWER_SELECT':
            return __assign({}, state, { index: typeof action.index === 'number' ? action.index : state.index });
        default:
            return state;
    }
}
