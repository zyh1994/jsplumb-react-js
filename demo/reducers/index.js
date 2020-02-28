import { combineReducers } from 'redux';
import connections from './connections';
import debug from './debug';
import diagrams from './diagrams';
import drawers from './drawers';
import drawerSettings from './drawerSettings';
import miscellaneous from './miscellaneous';
import nodes from './nodes';
import orientation from './orientation';
import selections from './selections';
import sources from './sources';
import tabs from './tabs';
import tabSettings from './tabSettings';
var reducers = {
    connections: connections,
    debug: debug,
    diagrams: diagrams,
    drawerSettings: drawerSettings,
    drawers: drawers,
    miscellaneous: miscellaneous,
    nodes: nodes,
    orientation: orientation,
    selections: selections,
    sources: sources,
    tabSettings: tabSettings,
    tabs: tabs
};
var combinedReducers = combineReducers(reducers);
export default combinedReducers;
