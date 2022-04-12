module.exports = {
  options: {
    defaultLocale: 'fr',
    locales: {
      fr: {
        label: 'Français',
        prefix: '/fr',
      },
      en: {
        label: 'English',
        prefix: '/en',
      },
    },
  },
  helpers(self) {
    return {
      locales() {
        return Object.entries(self.locales).map(([key, locale]) => ({
          ...locale,
          name: key,
        }))
      },
    }
  },
}
