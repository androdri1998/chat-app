import { RefObject, useEffect } from "react";

import { MessageItem } from "../../interfaces/MessageItem";
import { addValueToANewArray } from "../../../../utils/arrayUtils";
import WebSocketProvider from "../../../../providers/WebSocketProvider";
import { socket } from "../../../../lib";
import { listerners } from "../../../../constants";
import { Message } from "../Message";

interface ChatMessagesProps {
  messageList: MessageItem[];
  handleMessageList: (newMessageList: MessageItem[]) => void;
  chatScrollRef: RefObject<HTMLElement>;
}

export const ChatMessages = ({
  handleMessageList,
  messageList,
  chatScrollRef,
}: ChatMessagesProps) => {
  useEffect(() => {
    const receiveMessageAction = (data: MessageItem) => {
      if (!data.sentByUser) {
        const messageItem: MessageItem = {
          sentByUser: data.sentByUser,
          message: data.message,
          name: data.name,
        };
        const messageListClone: MessageItem[] = addValueToANewArray(
          messageList,
          messageItem
        ) as MessageItem[];

        handleMessageList(messageListClone);
      }
    };

    const webSocketProvider = new WebSocketProvider(socket);
    webSocketProvider.subscribe<MessageItem>(
      listerners.receiveMessage,
      receiveMessageAction
    );

    return () => {
      webSocketProvider.unsubscribe<MessageItem>(
        listerners.receiveMessage,
        receiveMessageAction
      );
    };
  }, [messageList, handleMessageList]);

  return (
    <section
      data-testid="chat-messages"
      className="chat-messages"
      ref={chatScrollRef}
    >
      {messageList.map((messageItem: MessageItem, index) => (
        <Message messageItem={messageItem} key={index} />
      ))}
    </section>
  );
};
