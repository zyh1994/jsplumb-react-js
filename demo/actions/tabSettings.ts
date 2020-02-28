export interface ITabSelectAction {
  index: number;
  type: 'TAB_SELECT';
}

export const onTabSelect = (index: number): ITabSelectAction => ({
  index,
  type: 'TAB_SELECT'
});
