var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { onSetDiagramScale, onSetDiagramXYOffset } from 'demo/actions/diagrams';
import { onRemoveNode, onUpdateNode } from 'demo/actions/nodes';
import { onSelectionUpdate } from 'demo/actions/selections';
import { onAddConnection, onRemoveConnection } from 'demo/actions/sources';
import defaultState from 'demo/defaultState';
import { connect } from 'react-redux';
import { connectWithRouter } from 'ui-router-react-digest';
import Diagram from './Diagram';
var defaultConnections = [];
var defaultNodes = {};
var mapRouterToProps = function (router) { return ({
    diagramId: router.stateService.params.id
}); };
var mapStateToProps = function (state, _a) {
    if (state === void 0) { state = defaultState; }
    var diagramId = _a.diagramId;
    return ({
        connections: state.diagrams[diagramId].nodes.reduce(function (connections, nodeId) { return (connections.concat((state.sources[nodeId] ? state.sources[nodeId].map(function (connectionId) { return ({ source: nodeId, id: connectionId, target: state.connections[connectionId].target }); }) : []))); }, defaultConnections.slice()),
        nodes: state.diagrams[diagramId].nodes.reduce(function (nodes, nodeId) {
            var _a;
            return (
            // tslint:disable-next-line:prefer-object-spread
            Object.assign(nodes, (_a = {}, _a[nodeId] = state.nodes[nodeId], _a)));
        }, __assign({}, defaultNodes)),
        scale: state.diagrams[diagramId].scale,
        selections: state.selections,
        xOffset: state.diagrams[diagramId].xOffset,
        yOffset: state.diagrams[diagramId].yOffset
    });
};
export default connectWithRouter(mapRouterToProps, false)(connect(mapStateToProps, {
    onAddConnection: onAddConnection,
    onRemoveConnection: onRemoveConnection,
    onRemoveNode: onRemoveNode,
    onSelectionUpdate: onSelectionUpdate,
    onSetDiagramScale: onSetDiagramScale,
    onSetDiagramXYOffset: onSetDiagramXYOffset,
    onUpdateNode: onUpdateNode
})(Diagram));
