import {
  onDrawerDockedToggle,
  onDrawerDragToggle,
  onDrawerHoverToggle
} from 'demo/actions/drawerSettings';
import {onOrientationToggle} from 'demo/actions/orientation';
import {
  onTabAdd,
  onTabRemove
} from 'demo/actions/tabs';
import defaultState from 'demo/defaultState';
import {connect} from 'react-redux';
import Settings from './Settings';

const mapStateToProps = (state = defaultState) => ({
  drawerDocked: state.drawerSettings.docked,
  drawerDrag: state.drawerSettings.drag,
  drawerHover: state.drawerSettings.hover,
  orientation: state.orientation,
  tabs: state.tabs
});

export default connect(
  mapStateToProps,
  {
    onDrawerDockedToggle,
    onDrawerDragToggle,
    onDrawerHoverToggle,
    onOrientationToggle,
    onTabAdd,
    onTabRemove
  }
)(Settings);
