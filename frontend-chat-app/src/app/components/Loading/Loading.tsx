import { useTranslate } from "../../hooks";
import { Paragraph } from "../Paragraph";

export const Loading = () => {
  const { t } = useTranslate();

  return <Paragraph text={t("general.loading")} />;
};
