import { Paragraph } from "../../../../components/Paragraph";

interface TitleChatProps {
  title: string;
}

export const TitleChat = ({ title }: TitleChatProps) => {
  return <Paragraph classNames={"title-chat"} text={title} />;
};
