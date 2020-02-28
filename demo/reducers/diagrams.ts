import {
  IAddDiagramAction,
  IRemoveDiagramAction,
  ISetDiagramScaleAction,
  ISetDiagramXOffsetAction,
  ISetDiagramXYOffsetAction,
  ISetDiagramXYScaleAction,
  ISetDiagramYOffsetAction
} from 'demo/actions/diagrams';
import {
  IAddNodeAction,
  IRemoveNodeAction
} from 'demo/actions/nodes';
import defaultState from 'demo/defaultState';

export default function diagrams(
  state = defaultState.diagrams,
  action: IAddDiagramAction |
    IAddNodeAction |
    IRemoveDiagramAction |
    IRemoveNodeAction |
    ISetDiagramScaleAction |
    ISetDiagramXOffsetAction |
    ISetDiagramXYOffsetAction |
    ISetDiagramXYScaleAction |
    ISetDiagramYOffsetAction
): IDiagrams {
  switch (action.type) {
    case 'DIAGRAM_ADD':
      return {
        ...state,
        [action.diagramId]: action.diagram
      };
    case 'DIAGRAM_REMOVE':
      const {[action.diagramId]: omit, ...remaining} = state;
      return remaining;
    case 'DIAGRAM_SET_XYSCALE':
      return {
        ...state,
        [action.diagramId]: {
          ...state[action.diagramId],
          scale: action.scale,
          xOffset: action.xOffset,
          yOffset: action.yOffset
        }
      };
    case 'DIAGRAM_SET_SCALE':
      return {
        ...state,
        [action.diagramId]: {
          ...state[action.diagramId],
          scale: action.scale
        }
      };
    case 'DIAGRAM_SET_XYOFFSET':
      return {
        ...state,
        [action.diagramId]: {
          ...state[action.diagramId],
          xOffset: action.xOffset,
          yOffset: action.yOffset
        }
      };
    case 'DIAGRAM_SET_XOFFSET':
      return {
        ...state,
        [action.diagramId]: {
          ...state[action.diagramId],
          xOffset: action.xOffset
        }
      };
    case 'DIAGRAM_SET_YOFFSET':
      return {
        ...state,
        [action.diagramId]: {
          ...state[action.diagramId],
          yOffset: action.yOffset
        }
      };
    case 'NODE_ADD':
      return {
        ...state,
        [action.diagramId]: {
          ...state[action.diagramId],
          nodes: [
            ...state[action.diagramId].nodes,
            action.nodeId
          ]
        }
      };
    case 'NODE_REMOVE':
      return {
        ...state,
        [action.diagramId]: {
          ...state[action.diagramId],
          nodes: state[action.diagramId].nodes.filter(node => (
            node.toString() !== action.nodeId
          ))
        }
      };
    default:
      return state;
  }
}
