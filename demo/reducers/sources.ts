import {
  IAddConnectionAction,
  IRemoveConnectionAction
} from 'demo/actions/sources';
import defaultState from 'demo/defaultState';

export default function connections(
  state = defaultState.sources,
  action: IAddConnectionAction |
    IRemoveConnectionAction
): IDiagramNodes {
  switch (action.type) {
    case 'CONNECTION_ADD':
      return {
        ...state,
        [action.sourceId]: [
          ...(state[action.sourceId] || []),
          action.connectionId
        ]
      };
    case 'CONNECTION_REMOVE':
      console.log(action.sourceId); // tslint:disable-line:no-console
      console.log(action.connectionId); // tslint:disable-line:no-console
      return {
        ...state,
        [action.sourceId]: state[action.sourceId].filter(connectionId => (
          connectionId !== action.connectionId
        ))
      };
    default:
      return state;
  }
}
