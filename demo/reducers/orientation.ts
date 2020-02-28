import {IOrientationAction} from 'demo/actions/orientation';
import defaultState from 'demo/defaultState';

export default function orientation(
  state = defaultState.orientation,
  action: IOrientationAction
) {
  switch (action.type) {
    case 'ORIENTATION':
      if (action.position === 'left') {
        return 'left';
      }
      if (action.position === 'right') {
        return 'right';
      }
      if (typeof action.position === 'undefined' || action.position === null) {
        return state === 'left' ? 'right' : 'left';
      }
      return state;
    default:
      return state;
  }
}
