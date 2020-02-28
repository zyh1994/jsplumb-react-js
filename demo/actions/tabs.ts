import {Tab} from 'ui-router-react-digest';

export interface ITabAddAction {
  tab: Tab;
  type: 'TAB_ADD';
}

export const onTabAdd = (tab: Tab): ITabAddAction => ({
  tab,
  type: 'TAB_ADD'
});

export interface ITabRemoveAction {
  index: number;
  type: 'TAB_REMOVE';
}

export const onTabRemove = (index: number): ITabRemoveAction => ({
  index,
  type: 'TAB_REMOVE'
});
