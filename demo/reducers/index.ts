import {combineReducers} from 'redux';
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

const reducers = {
  connections,
  debug,
  diagrams,
  drawerSettings,
  drawers,
  miscellaneous,
  nodes,
  orientation,
  selections,
  sources,
  tabSettings,
  tabs
};

const combinedReducers = combineReducers(reducers as any);

export default combinedReducers;
