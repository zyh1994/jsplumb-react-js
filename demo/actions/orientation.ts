import {Orientation} from 'ui-router-react-digest';

export interface IOrientationAction {
  position: Orientation;
  type: 'ORIENTATION';
}

export const onOrientationToggle = (position: Orientation): IOrientationAction => ({
  position,
  type: 'ORIENTATION'
});
