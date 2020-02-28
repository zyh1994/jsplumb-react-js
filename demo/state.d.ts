import {
  Drawers,
  Orientation,
  Tabs
} from 'ui-router-react-digest';

/*
  tslint:disable:
  no-namespace
  no-internal-module
  no-unused-expression
  interface-name
  class-name
  array-type
  no-empty-interface
*/

export type Debug = boolean;

export interface DrawerSettings {
  docked: boolean;
  drag: boolean;
  hover: boolean;
  index: number;
  open: boolean;
}

export interface Miscellaneous {
  shortName: string;
  title: string;
}

export type Selections = string[];

export interface TabSettings {
  index: number;
}

declare module State {
  export interface All {
    connections: IConnections;
    debug: Debug;
    diagrams: IDiagrams;
    drawerSettings: DrawerSettings;
    drawers: Drawers;
    miscellaneous: Miscellaneous;
    nodes: IDiagramNodes;
    orientation: Orientation;
    selections: Selections;
    sources: ISources;
    tabSettings: TabSettings;
    tabs: Tabs;
  }
}

/*
  tslint:enable:
  no-namespace
  no-internal-module
  no-unused-expression
  interface-name
  class-name
  array-type
  no-empty-interface
*/

export default State;
