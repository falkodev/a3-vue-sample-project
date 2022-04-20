import displaySnackbar from './snackbar'

export default () => {
  apos.util.onReady(() => {
    /**
     * Open and close nav menu in header
     */
    const menuIcon = document.querySelector('[data-menu-icon]')
    const menuList = document.querySelector('[data-menu-list]')
    const logoutLink = document.querySelector('[data-logout]')

    if (menuIcon && menuList) {
      menuIcon.addEventListener('click', () => {
        menuList.classList.toggle('t-menu__list--open')
        menuIcon.classList.toggle('t-menu__icon--close')
      })

      document.body.addEventListener('click', (evt) => {
        if (!evt.target?.className?.match?.(/t-menu/)) {
          menuList.classList.remove('t-menu__list--open')
          menuIcon.classList.remove('t-menu__icon--close')
        }
      })
    }

    if (logoutLink) {
      logoutLink.addEventListener('click', async () => {
        apos.bus.$emit('admin-menu-click', '@apostrophecms/login-logout')
        sessionStorage.setItem('aposLoadAfterLogout', true)
      })
    }

    const justLoggedIn = sessionStorage.getItem('aposLoadAfterLogin')
    if (JSON.parse(justLoggedIn)) {
      const { innerText } = document.querySelector('[data-logged-in-msg]')
      sessionStorage.setItem('aposLoadAfterLogin', false)
      displaySnackbar(innerText, { type: 'success', dismiss: true })
    }

    const justLoggedOut = sessionStorage.getItem('aposLoadAfterLogout')
    if (JSON.parse(justLoggedOut)) {
      const { innerText } = document.querySelector('[data-logged-out-msg]')
      sessionStorage.setItem('aposLoadAfterLogout', false)
      displaySnackbar(innerText, { type: 'success', dismiss: true })
    }
  })
}
