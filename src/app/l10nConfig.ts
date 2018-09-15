import { L10nConfig, StorageStrategy, ProviderType } from 'angular-l10n';

export const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'ru', dir: 'ltr' }
    ],
    language: 'en',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: '../assets/locales/locale-' }
    ],
    caching: true,
    missingValue: 'No translation found... :(('
  }
};
