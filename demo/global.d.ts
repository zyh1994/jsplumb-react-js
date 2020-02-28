declare module '*.css';
declare module '*.scss';

declare var System: {
  import: any
};

declare module '*.json' {
    const value: any;
    // @ts-ignore
    export default value;
}

declare var BUILD: {
  DATE: string;
};

declare var PACKAGE: {
  DESCRIPTION: string,
  NAME: string,
  TITLE: string,
  VERSION: string
};

interface IConnection {
  source?: string;
  id?: string;
  target: string;
  [key: string]: any;
}

interface IConnections {
  [key: string]: IConnection;
}

interface ISources {
  [key: string]: string[];
}

interface IDiagramNode {
  connections?: string[];
  // @ts-ignore
  style?: CSSProperties;
  type?: string;
  [key: string]: any;
}

interface IDiagramNodes {
  [key: string]: IDiagramNode;
}

interface IDiagram {
  nodes: string[];
  [key: string]: any;
}

interface IDiagrams {
  [key: string]: IDiagram;
}
