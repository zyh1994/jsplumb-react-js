import {
  IDrawerDockAction,
  IDrawerDragAction,
  IDrawerHoverAction,
  IDrawerOpenAction,
  IDrawerSelectAction
} from 'demo/actions/drawerSettings';
import defaultState from 'demo/defaultState';

export default function drawerSettings(
  state = defaultState.drawerSettings,
  action: IDrawerDockAction |
    IDrawerDragAction |
    IDrawerHoverAction |
    IDrawerOpenAction |
    IDrawerSelectAction
) {
  switch (action.type) {
    case 'DRAWER_DOCK':
      return {
        ...state,
        docked: typeof action.docked === 'undefined' ||
          action.docked === null ?
          !state.docked :
          action.docked
      };
    case 'DRAWER_DRAG':
      return {
        ...state,
        drag: typeof action.drag === 'undefined' ||
          action.drag === null ?
          !state.drag :
          action.drag
      };
    case 'DRAWER_HOVER':
      return {
        ...state,
        hover: typeof action.hover === 'undefined' ||
          action.hover === null ?
          !state.hover :
          action.hover
      };
    case 'DRAWER_OPEN':
      return {
        ...state,
        open: typeof action.open === 'undefined' ||
          action.open === null ?
          !state.open :
          action.open
      };
    case 'DRAWER_SELECT':
      return {
        ...state,
        index: typeof action.index === 'number' ? action.index : state.index
      };
    default:
      return state;
  }
}
