import uuidv4 from 'uuid/v4';
export var onAddDiagram = function (diagram, diagramId) {
    if (diagramId === void 0) { diagramId = uuidv4(); }
    return ({
        diagram: diagram,
        diagramId: diagramId,
        type: 'DIAGRAM_ADD'
    });
};
export var onRemoveDiagram = function (diagramId) { return ({
    diagramId: diagramId,
    type: 'DIAGRAM_REMOVE'
}); };
export var onSetDiagramXYScale = function (diagramId, scale, xOffset, yOffset) { return ({
    diagramId: diagramId,
    scale: scale,
    type: 'DIAGRAM_SET_XYSCALE',
    xOffset: xOffset,
    yOffset: yOffset
}); };
export var onSetDiagramXYOffset = function (diagramId, xOffset, yOffset) { return ({
    diagramId: diagramId,
    type: 'DIAGRAM_SET_XYOFFSET',
    xOffset: xOffset,
    yOffset: yOffset
}); };
export var onSetDiagramXOffset = function (diagramId, xOffset) { return ({
    diagramId: diagramId,
    type: 'DIAGRAM_SET_XOFFSET',
    xOffset: xOffset
}); };
export var onSetDiagramYOffset = function (diagramId, yOffset) { return ({
    diagramId: diagramId,
    type: 'DIAGRAM_SET_YOFFSET',
    yOffset: yOffset
}); };
export var onSetDiagramScale = function (diagramId, scale) { return ({
    diagramId: diagramId,
    scale: scale,
    type: 'DIAGRAM_SET_SCALE'
}); };
