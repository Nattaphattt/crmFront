import 'server-only'
import type { Locale } from './i18nConfig'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('#/dictionaries/en.json').then((module) => module.default),
  th: () => import('#/dictionaries/th.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.th()