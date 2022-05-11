import displaySnackbar from '@/snackbar'

export default () => {
  apos.util.onReady(() => {
    const form = document.querySelector('[data-login-form]')

    if (form) {
      const { signupDone, loginError } = apos.login.labels

      const justRegistered = sessionStorage.getItem('aposLoadAfterRegister')
      if (JSON.parse(justRegistered)) {
        sessionStorage.setItem('aposLoadAfterRegister', false)
        displaySnackbar(signupDone, {
          type: 'success',
          dismiss: true,
        })
      }

      const usernameInput = document.querySelector('[data-input-username]')
      const passwordInput = document.querySelector('[data-input-password]')
      const usernameLabel = document.querySelector('[data-label-username]')
      const passwordLabel = document.querySelector('[data-label-password]')
      const formError = document.querySelector('.t-form__errors')

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
          window.sessionStorage.setItem('aposLoadAfterLogin', true)
          location.assign(`${apos.prefix}/`)
        } catch (e) {
          const error = e.message || loginError
          formError.innerHTML = error
          formError.style.display = 'block'
        } finally {
          loader.style.opacity = 0
        }
      }
    }
  })
}
