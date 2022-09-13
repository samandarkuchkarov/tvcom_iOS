import i18next from 'i18next';

export default function translateText(text, params = null) {
  return i18next.t(text, params ?? {});
}
