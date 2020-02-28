import {
  IAddNodeAction,
  IRemoveNodeAction,
  IUpdateNodeAction
} from 'demo/actions/nodes';
import defaultState from 'demo/defaultState';

export default function nodes(
  state = defaultState.nodes,
  action: IAddNodeAction |
    IRemoveNodeAction |
    IUpdateNodeAction
): IDiagramNodes {
  switch (action.type) {
    case 'NODE_ADD':
      return {
        ...state,
        [action.nodeId]: action.node
      };
    case 'NODE_REMOVE':
      const {[action.nodeId]: omit, ...remaining} = state;
      return remaining;
    case 'NODE_UPDATE':
      return {
        ...state,
        [action.nodeId]: {
          ...state[action.nodeId],
          ...action.node,
          style: {
            ...state[action.nodeId].style,
            ...action.node.style
          }
        }
      };
    default:
      return state;
  }
}
