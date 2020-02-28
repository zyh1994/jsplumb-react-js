export var PREFIX = {
    CONNECTION: 'conn',
    GRAPH: 'dag',
    NODE: 'node'
};
export function generateHtmlId(prefix, diagramId, id) {
    return prefix + "-" + diagramId.toString().slice(-5) + "-" + id.toString().slice(-5);
}
export function generateNodeId(diagramId, id) {
    return generateHtmlId(PREFIX.NODE, diagramId, id);
}
export function generateConnectionId(diagramId, id) {
    return generateHtmlId(PREFIX.CONNECTION, diagramId, id);
}
export function generateGraphId(id) {
    return PREFIX.GRAPH + "-" + id;
}
