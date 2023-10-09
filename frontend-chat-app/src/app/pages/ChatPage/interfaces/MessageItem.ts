export interface MessageItem {
    sentByUser: boolean;
    message: string;
    name: string;
}
  
export interface MessageItemSocket {
    message: string;
    name: string;
}