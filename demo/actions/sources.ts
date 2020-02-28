export interface IAddConnectionAction {
  connection: IConnection;
  connectionId: string;
  sourceId: string;
  type: 'CONNECTION_ADD';
}

export const onAddConnection = (
  sourceId: string,
  connectionId: string,
  connection: IConnection
): IAddConnectionAction => ({
  connection,
  connectionId,
  sourceId,
  type: 'CONNECTION_ADD'
});

export interface IRemoveConnectionAction {
  connectionId: string;
  sourceId: string;
  type: 'CONNECTION_REMOVE';
}

export const onRemoveConnection = (
  sourceId: string,
  connectionId: string
): IRemoveConnectionAction => ({
  connectionId,
  sourceId,
  type: 'CONNECTION_REMOVE'
});

export interface IUpdateConnectionAction {
  connectionId: string;
  connection: IConnection;
  type: 'CONNECTION_UPDATE';
}

export const onUpdateConnection = (
  connectionId: string,
  connection: IConnection
): IUpdateConnectionAction => ({
  connection,
  connectionId,
  type: 'CONNECTION_UPDATE'
});
