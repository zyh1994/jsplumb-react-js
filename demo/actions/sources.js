export var onAddConnection = function (sourceId, connectionId, connection) { return ({
    connection: connection,
    connectionId: connectionId,
    sourceId: sourceId,
    type: 'CONNECTION_ADD'
}); };
export var onRemoveConnection = function (sourceId, connectionId) { return ({
    connectionId: connectionId,
    sourceId: sourceId,
    type: 'CONNECTION_REMOVE'
}); };
export var onUpdateConnection = function (connectionId, connection) { return ({
    connection: connection,
    connectionId: connectionId,
    type: 'CONNECTION_UPDATE'
}); };
