import { languages } from "../data/languages";
import { getBrowserLocaleSetting } from "../utils/navigatorUtils";

export default {
  serverUrl: import.meta.env.VITE_SERVER_URL,
};

const fallbackLanguage = "en-US";

export const i18nConfig = {
  resources: languages,
  lng: getBrowserLocaleSetting(),
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  }
}