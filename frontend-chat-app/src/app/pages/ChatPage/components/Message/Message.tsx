import { Paragraph } from "../../../../components/Paragraph";
import { MessageItem } from "../../interfaces/MessageItem";

interface MessageProps {
  messageItem: MessageItem;
}

export const Message = ({ messageItem }: MessageProps) => {
  return (
    <article
      data-testid="message-component"
      className={`message-bubble ${
        !messageItem.sentByUser
          ? "message-bubble--left"
          : "message-bubble--right"
      }`}
    >
      <Paragraph
        classNames="message-bubble__username"
        text={messageItem.name}
      />
      <Paragraph classNames="message-bubble__text" text={messageItem.message} />
    </article>
  );
};
