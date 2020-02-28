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
import reducers from 'demo/reducers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { loadState, saveState } from './localStorage';
var middleware = applyMiddleware.apply(void 0, [].concat(process.env.NODE_ENV !== 'production' ?
    [
        // tslint:disable-next-line:no-var-requires
        require('redux-immutable-state-invariant')["default"]()
    ] : []));
var store = createStore(reducers, __assign({}, defaultState, loadState()), composeWithDevTools(middleware));
store.subscribe(function () {
    saveState(store.getState());
});
export default store;
