export interface IDebugToggleAction {
  type: 'DEBUG';
  value: boolean;
}

export const onDebugToggle = (value?: boolean): IDebugToggleAction => ({
  type: 'DEBUG',
  value,
});
