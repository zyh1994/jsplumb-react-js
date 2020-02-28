import {
  ClassicComponentClass,
  ComponentClass,
  StatelessComponent
} from 'react';
import E404 from './404';
import E404Tools from './404/Tools';
import Diagram from './Diagram';
import DiagramTools from './Diagram/Tools';
import SimpleDiagram from './SimpleDiagram';
import SimpleDiagramTools from './SimpleDiagram/Tools';

interface ITabTypes {
  [keys: string]: {
    component: StatelessComponent<any> | ComponentClass<any> | ClassicComponentClass<any>;
    drawers: {
      [keys: string]: StatelessComponent<any> | ComponentClass<any> | ClassicComponentClass<any>;
    };
  };
}

const tabTypes: ITabTypes = {
  404: {
    component: E404,
    drawers: {
      tools: E404Tools
    }
  },
  diagram: {
    component: Diagram,
    drawers: {
      tools: DiagramTools
    }
  },
  simpleDiagram: {
    component: SimpleDiagram,
    drawers: {
      tools: SimpleDiagramTools
    }
  },
};

export default tabTypes;
