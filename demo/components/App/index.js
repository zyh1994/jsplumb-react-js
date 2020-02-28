import { onDrawerOpenToggle, onDrawerSelect } from 'demo/actions/drawerSettings';
import { onTabSelect } from 'demo/actions/tabSettings';
import defaultState from 'demo/defaultState';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import App from './App';
var mapStateToProps = function (state) {
    if (state === void 0) { state = defaultState; }
    return ({
        debug: state.debug,
        drawerDocked: state.drawerSettings.docked,
        drawerDrag: state.drawerSettings.drag,
        drawerHover: state.drawerSettings.hover,
        drawerIndex: state.drawerSettings.index,
        drawerOpen: state.drawerSettings.open,
        drawers: state.drawers,
        orientation: state.orientation,
        tabIndex: state.tabSettings.index,
        tabs: state.tabs,
        title: state.miscellaneous.title
    });
};
export default hot(module)(connect(mapStateToProps, {
    onDrawerOpenToggle: onDrawerOpenToggle,
    onDrawerSelect: onDrawerSelect,
    onTabSelect: onTabSelect
})(App));
