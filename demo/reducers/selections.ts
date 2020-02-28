import {
  IAddSelectionAction,
  IRemoveSelectionAction,
  IUpdateSelectionsAction
} from 'demo/actions/selections';
import defaultState from 'demo/defaultState';

export default function tabs(
  state = defaultState.selections,
  action: IUpdateSelectionsAction |
    IAddSelectionAction |
    IRemoveSelectionAction
) {
  switch (action.type) {
    case 'SELECTION_UPDATE':
      if (state.length === 0 && action.selections.length === 0) {
        return state;
      }
      return action.selections;
    case 'SELECTION_ADD':
      return [
        ...state,
        ...action.selection
      ];
    case 'SELECTION_REMOVE':
      return state.includes(action.selection) ?
        state.filter(selection => (selection !== action.selection)) :
        state;
    default:
      return state;
  }
}
