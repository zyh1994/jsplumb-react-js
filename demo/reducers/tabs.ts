import {
  ITabAddAction,
  ITabRemoveAction
} from 'demo/actions/tabs';
import defaultState from 'demo/defaultState';
import uuidv4 from 'uuid/v4';

const tabDefaults = {
  deepStateRedirect: true,
  params: {
    title: 'New Tab',
    type: 'dynamic'
  },
  sticky: true
};

export default function tabs(
  state = defaultState.tabs,
  action: ITabAddAction |
    ITabRemoveAction
) {
  switch (action.type) {
    case 'TAB_ADD':
      return [...state, {
        ...tabDefaults,
        ...action.tab,
        name: action.tab.name || uuidv4()
      }];
    case 'TAB_REMOVE':
      return typeof action.index === 'number' && state[action.index] ?
        state.filter((tab, index) => (index !== action.index)) :
        state;
    default:
      return state;
  }
}
