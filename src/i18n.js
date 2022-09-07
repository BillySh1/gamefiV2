import { createI18n } from "vue-i18n";

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
import zh from "./locales/zh";
import en from "./locales/en";

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: localStorage.getItem("language") || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: {
    zh,
    en,
  },
});

export default i18n;
