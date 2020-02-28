export interface IDrawerDockAction {
  docked: boolean;
  type: 'DRAWER_DOCK';
}

export const onDrawerDockedToggle = (docked: boolean): IDrawerDockAction => ({
  docked,
  type: 'DRAWER_DOCK'
});

export interface IDrawerDragAction {
  drag: boolean;
  type: 'DRAWER_DRAG';
}

export const onDrawerDragToggle = (drag: boolean): IDrawerDragAction => ({
  drag,
  type: 'DRAWER_DRAG'
});

export interface IDrawerHoverAction {
  hover: boolean;
  type: 'DRAWER_HOVER';
}

export const onDrawerHoverToggle = (hover: boolean): IDrawerHoverAction => ({
  hover,
  type: 'DRAWER_HOVER'
});

export interface IDrawerSelectAction {
  index: number;
  type: 'DRAWER_SELECT';
}

export const onDrawerSelect = (index: number): IDrawerSelectAction => ({
  index,
  type: 'DRAWER_SELECT'
});

export interface IDrawerOpenAction {
  open: boolean;
  type: 'DRAWER_OPEN';
}

export const onDrawerOpenToggle = (open: boolean): IDrawerOpenAction => ({
  open,
  type: 'DRAWER_OPEN'
});
