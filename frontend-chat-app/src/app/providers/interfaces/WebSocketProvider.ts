export interface WebSocketProvider {
    connect: () => void;
    disconnect: () => void;
    subscribe: <DataType>(listenerName: string, callback: (data: DataType) => void) => void
    unsubscribe: <DataType>(listenerName: string, callback: (data: DataType) => void) => void;
    emit: <DataType>(emitName: string, value: DataType) => void
}