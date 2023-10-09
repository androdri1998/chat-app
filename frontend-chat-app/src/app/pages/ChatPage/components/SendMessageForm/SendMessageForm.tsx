import { FormEvent, useCallback, useState } from "react";

import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { socket } from "../../../../lib";
import { MessageItem, MessageItemSocket } from "../../interfaces/MessageItem";
import SendMessageService from "../../../../services/SendMessageServicce";
import WebSocketProvider from "../../../../providers/WebSocketProvider";
import { useTranslate } from "../../../../hooks";
import { addValueToANewArray } from "../../../../utils/arrayUtils";

interface SendMessageFormProps {
  messageList: MessageItem[];
  handleMessageList: (newMessageList: MessageItem[]) => void;
}

export const SendMessageForm = ({
  handleMessageList,
  messageList,
}: SendMessageFormProps) => {
  const { t } = useTranslate();
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (message) {
        const webSocketProvider = new WebSocketProvider(socket);
        const messageToSocket: MessageItemSocket = {
          message,
          name: t("general.you"),
        };

        const sendMessageService = new SendMessageService(webSocketProvider);
        sendMessageService.execute(messageToSocket);

        const messageItem: MessageItem = {
          sentByUser: true,
          message: message,
          name: t("general.you"),
        };
        const messageListClone: MessageItem[] = addValueToANewArray(
          messageList,
          messageItem
        ) as MessageItem[];

        handleMessageList(messageListClone);
        setMessage("");
      }
    },
    [message, t, messageList, handleMessageList]
  );

  const handleMessage = useCallback((newMessaveValue: string) => {
    setMessage(newMessaveValue);
  }, []);

  return (
    <form
      className="form-send-message"
      onSubmit={(event) => handleSendMessage(event)}
    >
      <Input
        onChangeValue={handleMessage}
        placeholder={t("chat.placeholderInput")}
        value={message}
        adjustClassname="form-send-message__adjust-input"
      />
      <Button
        typeButton="submit"
        label={t("chat.buttonLabel")}
        disabled={!message}
      />
    </form>
  );
};
