import {UIRouterReact} from '@uirouter/react';
import {onSetDiagramScale} from 'demo/actions/diagrams';
import {
  onAddNode,
  onRemoveNode
} from 'demo/actions/nodes';
import defaultState from 'demo/defaultState';
import {connect} from 'react-redux';
import {connectWithRouter} from 'ui-router-react-digest';
import Tools from './Tools';

const mapRouterToProps = (router: UIRouterReact) => ({
  diagramId: router.stateService.params.id
});

const mapStateToProps = (
  state = defaultState,
  {diagramId}: {diagramId: string}
) => ({
  scale: state.diagrams[diagramId].scale,
  selections: state.selections
});

export default connectWithRouter(
  mapRouterToProps
)(connect(
  mapStateToProps,
  {
    onAddNode,
    onRemoveNode,
    onSetDiagramScale
  }
)(
  Tools
));
