import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ru from './ru.json';
import uz from './uz.json';

const resources = {
  ru: ru,
  uz: uz,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'ru',
  fallbackLng: 'ru',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;