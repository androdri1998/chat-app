import { TitleChat } from "../TitleChat";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header data-testid="chat-header" className="header-chat">
      <TitleChat title={title} />
    </header>
  );
};
