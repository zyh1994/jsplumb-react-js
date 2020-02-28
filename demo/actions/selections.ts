export interface IUpdateSelectionsAction {
  selections: string[];
  type: 'SELECTION_UPDATE';
}

export const onSelectionUpdate = (selections: string[]): IUpdateSelectionsAction => ({
  selections,
  type: 'SELECTION_UPDATE'
});

export interface IAddSelectionAction {
  selection: string;
  type: 'SELECTION_ADD';
}

export const onSelectionAdd = (selection: string): IAddSelectionAction => ({
  selection,
  type: 'SELECTION_ADD'
});

export interface IRemoveSelectionAction {
  selection: string;
  type: 'SELECTION_REMOVE';
}

export const onSelectionRemove = (selection: string): IRemoveSelectionAction => ({
  selection,
  type: 'SELECTION_REMOVE'
});
