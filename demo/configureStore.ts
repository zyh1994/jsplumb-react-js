import defaultState from 'demo/defaultState';
import reducers from 'demo/reducers';
import State from 'demo/state';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {loadState, saveState} from './localStorage';

const middleware = applyMiddleware(...[].concat(
  process.env.NODE_ENV !== 'production' ?
  [
    // tslint:disable-next-line:no-var-requires
    require('redux-immutable-state-invariant').default()
  ] : []
));

const store = createStore(
  reducers,
  {
    ...defaultState,
    ...loadState()
  },
  composeWithDevTools(
    middleware
  )
);

store.subscribe(() => {
  saveState(store.getState() as State.All);
});

export default store;
