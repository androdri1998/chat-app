interface ParagraphProps {
  text: string;
  classNames?: string;
}

export const Paragraph = ({ classNames = "", text }: ParagraphProps) => {
  return <p className={classNames}>{text}</p>;
};
