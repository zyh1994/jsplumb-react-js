import { onSetDiagramScale } from 'demo/actions/diagrams';
import { onAddNode, onRemoveNode } from 'demo/actions/nodes';
import defaultState from 'demo/defaultState';
import { connect } from 'react-redux';
import { connectWithRouter } from 'ui-router-react-digest';
import Tools from './Tools';
var mapRouterToProps = function (router) { return ({
    diagramId: router.stateService.params.id
}); };
var mapStateToProps = function (state, _a) {
    if (state === void 0) { state = defaultState; }
    var diagramId = _a.diagramId;
    return ({
        scale: state.diagrams[diagramId].scale,
        selections: state.selections
    });
};
export default connectWithRouter(mapRouterToProps)(connect(mapStateToProps, {
    onAddNode: onAddNode,
    onRemoveNode: onRemoveNode,
    onSetDiagramScale: onSetDiagramScale
})(Tools));
