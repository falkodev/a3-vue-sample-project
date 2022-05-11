module.exports = {
  options: {
    label: 'Login',
    alias: 'login',
  },

  extendMethods() {
    return {
      getBrowserData(_super, req) {
        const data = _super(req)

        data.labels = {
          signupDone: req.t('apostrophe:loginPage.signupDone'),
          loginError: req.t('apostrophe:loginErrorGeneric'),
        }

        return data
      },
    }
  },
}
