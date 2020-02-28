import uuidv4 from 'uuid/v4';

export interface IAddNodeAction {
  diagramId: string;
  node: IDiagramNode;
  nodeId: string;
  type: 'NODE_ADD';
}

export const onAddNode = (
  diagramId: string,
  node: IDiagramNode,
  nodeId: string = uuidv4()
): IAddNodeAction => ({
  diagramId,
  node,
  nodeId,
  type: 'NODE_ADD'
});

export interface IRemoveNodeAction {
  diagramId: string;
  nodeId: string;
  type: 'NODE_REMOVE';
}

export const onRemoveNode = (
  diagramId: string,
  nodeId: string
): IRemoveNodeAction => ({
  diagramId,
  nodeId,
  type: 'NODE_REMOVE'
});

export interface IUpdateNodeAction {
  node: IDiagramNode;
  nodeId: string;
  type: 'NODE_UPDATE';
}

export const onUpdateNode = (
  nodeId: string,
  node: IDiagramNode
): IUpdateNodeAction => ({
  node,
  nodeId,
  type: 'NODE_UPDATE'
});
