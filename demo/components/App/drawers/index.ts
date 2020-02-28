import {
  ClassicComponentClass,
  ComponentClass,
  StatelessComponent
} from 'react';
import Settings from './Settings';

interface IDrawerTypes {
  [keys: string]: {
    component?: StatelessComponent<any> | ComponentClass<any> | ClassicComponentClass<any>;
  };
}

const drawerTypes: IDrawerTypes = {
  settings: {
    component: Settings,
  }
};

export default drawerTypes;
