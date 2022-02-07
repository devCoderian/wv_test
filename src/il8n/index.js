import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en';
import ko from './locales/ko';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3', //안드로이드 이슈가 있어서 추가해주어야 함
    resources: {
        en:en,
        ko,ko
    },
    lng: "ko", // default
    fallbackLng: "en", //안될 시?
    ns:['page'],  //ns는 namespace로 label, button, menu 등 구분해서 관리할 경우 필요??
    interpolation: {
      escapeValue: false //
    }
  });

  export default i18n