export default () => {
  const form = document.querySelector('[data-login-form]')
  const localeSwitcher = document.querySelector('[data-locale-switcher]')

  if (localeSwitcher) {
    const usernameInput = document.querySelector('[data-input-username]')
    const passwordInput = document.querySelector('[data-input-password]')
    const usernameLabel = document.querySelector('[data-label-username]')
    const passwordLabel = document.querySelector('[data-label-password]')
    const formError = document.querySelector('.t-form__errors')

    localeSwitcher.addEventListener('click', () => {
      const localeList = document.querySelector('[data-locale-list]')
      const display = localeList.style.display || 'none'
      localeList.style.display = display === 'none' ? 'flex' : 'none'
    })

    usernameInput.addEventListener('click', () => {
      removeErrorState()
    })

    passwordInput.addEventListener('click', () => {
      removeErrorState()
    })

    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      if (!usernameInput.value) {
        usernameInput.classList.add('t-form__input--red')
        usernameLabel.style.display = 'block'
        return
      }
      if (!passwordInput.value) {
        passwordInput.classList.add('t-form__input--red')
        passwordLabel.style.display = 'block'
        return
      }

      await login()
    })

    function removeErrorState() {
      usernameInput.classList.remove('t-form__input--red')
      usernameLabel.style.display = 'none'
      passwordInput.classList.remove('t-form__input--red')
      passwordLabel.style.display = 'none'
      formError.style.display = 'none'
    }

    async function login() {
      const loader = document.querySelector('.apos-busy')

      try {
        loader.style.opacity = 1

        await apos.http.post(`${apos.login.action}/login`, {
          body: {
            username: usernameInput.value,
            password: passwordInput.value,
            session: true,
          },
        })

        window.sessionStorage.setItem('aposStateChange', Date.now())
        window.sessionStorage.setItem('aposStateChangeSeen', '{}')
        location.assign(`${apos.prefix}/`)
      } catch (e) {
        const error =
          e.message || apos.i18n.i18n[apos.locale].apostrophe.loginErrorGeneric
        formError.innerHTML = error
        formError.style.display = 'block'
      } finally {
        loader.style.opacity = 0
      }
    }
  }
}
