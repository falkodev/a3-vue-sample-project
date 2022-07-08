const config = require('config')
/* istanbul ignore next */
module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    alias: 'register',
    label: 'Register Page',
    scene: 'apos',
  },

  extendMethods() {
    return {
      getBrowserData(_super, req) {
        const data = _super(req)
        const minPasswordLength = config.get('register.minPasswordLength')

        data.labels = {
          minPasswordLength,
          passwordLengthMessage: req.t(
            'apostrophe:registerPage.passwordLength',
            {
              nb: minPasswordLength,
            },
          ),
          requiredField: req.t('apostrophe:loginPage.required'),
          invalidEmail: req.t('apostrophe:registerPage.invalidEmail'),
          acceptConditions: req.t('apostrophe:registerPage.acceptConditions'),
        }

        return data
      },
    }
  },
}
