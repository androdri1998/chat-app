import "./ChatPage.css";
import { useCallback, useEffect, useRef, useState } from "react";

import { useTranslate } from "../../hooks/useTranslate";
import { MessageItem } from "./interfaces/MessageItem";
import { Header } from "./components/Header/Header";
import { SendMessageForm } from "./components/SendMessageForm";
import { ChatMessages } from "./components/ChatMessages";

export const ChatPage = () => {
  const { t } = useTranslate();
  const chatScrollRef = useRef<HTMLElement>(null);
  const [messageList, setMessageList] = useState<MessageItem[]>([]);

  const handleMessageList = useCallback((newMessageList: MessageItem[]) => {
    setMessageList(newMessageList);
  }, []);

  useEffect(() => {
    if (messageList.length > 0) {
      const chatScrollHeight = chatScrollRef.current?.scrollHeight || 0;
      chatScrollRef.current?.scrollTo(0, chatScrollHeight);
    }
  }, [messageList]);

  return (
    <main className="container-chat">
      <section className="container-chat-content">
        <Header title={t("chat.title")} />
        <ChatMessages
          handleMessageList={handleMessageList}
          messageList={messageList}
          chatScrollRef={chatScrollRef}
        />
        <SendMessageForm
          handleMessageList={handleMessageList}
          messageList={messageList}
        />
      </section>
    </main>
  );
};
