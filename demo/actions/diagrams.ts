import uuidv4 from 'uuid/v4';

export interface IAddDiagramAction {
  diagram: IDiagram;
  diagramId: string;
  type: 'DIAGRAM_ADD';
}

export const onAddDiagram = (
  diagram: IDiagram,
  diagramId: string = uuidv4()
): IAddDiagramAction => ({
  diagram,
  diagramId,
  type: 'DIAGRAM_ADD'
});

export interface IRemoveDiagramAction {
  diagramId: string;
  type: 'DIAGRAM_REMOVE';
}

export const onRemoveDiagram = (
  diagramId: string
): IRemoveDiagramAction => ({
  diagramId,
  type: 'DIAGRAM_REMOVE'
});

export interface ISetDiagramXYScaleAction {
  diagramId: string;
  scale: number;
  type: 'DIAGRAM_SET_XYSCALE';
  xOffset: number;
  yOffset: number;
}

export const onSetDiagramXYScale = (
  diagramId: string,
  scale: number,
  xOffset: number,
  yOffset: number
): ISetDiagramXYScaleAction => ({
  diagramId,
  scale,
  type: 'DIAGRAM_SET_XYSCALE',
  xOffset,
  yOffset
});

export interface ISetDiagramXYOffsetAction {
  diagramId: string;
  type: 'DIAGRAM_SET_XYOFFSET';
  xOffset: number;
  yOffset: number;
}

export const onSetDiagramXYOffset = (
  diagramId: string,
  xOffset: number,
  yOffset: number
): ISetDiagramXYOffsetAction => ({
  diagramId,
  type: 'DIAGRAM_SET_XYOFFSET',
  xOffset,
  yOffset
});

export interface ISetDiagramXOffsetAction {
  diagramId: string;
  type: 'DIAGRAM_SET_XOFFSET';
  xOffset: number;
}

export const onSetDiagramXOffset = (
  diagramId: string,
  xOffset: number
): ISetDiagramXOffsetAction => ({
  diagramId,
  type: 'DIAGRAM_SET_XOFFSET',
  xOffset
});

export interface ISetDiagramYOffsetAction {
  diagramId: string;
  type: 'DIAGRAM_SET_YOFFSET';
  yOffset: number;
}

export const onSetDiagramYOffset = (
  diagramId: string,
  yOffset: number
): ISetDiagramYOffsetAction => ({
  diagramId,
  type: 'DIAGRAM_SET_YOFFSET',
  yOffset
});

export interface ISetDiagramScaleAction {
  diagramId: string;
  type: 'DIAGRAM_SET_SCALE';
  scale: number;
}

export const onSetDiagramScale = (
  diagramId: string,
  scale: number
): ISetDiagramScaleAction => ({
  diagramId,
  scale,
  type: 'DIAGRAM_SET_SCALE'
});
