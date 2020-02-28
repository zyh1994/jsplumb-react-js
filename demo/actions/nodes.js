import uuidv4 from 'uuid/v4';
export var onAddNode = function (diagramId, node, nodeId) {
    if (nodeId === void 0) { nodeId = uuidv4(); }
    return ({
        diagramId: diagramId,
        node: node,
        nodeId: nodeId,
        type: 'NODE_ADD'
    });
};
export var onRemoveNode = function (diagramId, nodeId) { return ({
    diagramId: diagramId,
    nodeId: nodeId,
    type: 'NODE_REMOVE'
}); };
export var onUpdateNode = function (nodeId, node) { return ({
    node: node,
    nodeId: nodeId,
    type: 'NODE_UPDATE'
}); };
