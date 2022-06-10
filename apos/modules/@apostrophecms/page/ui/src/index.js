import displaySnackbar from '@/snackbar'

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
        menuIcon.classList.toggle('t-nav__icon--close')
      })

      document.body.addEventListener('click', (evt) => {
        if (
          !evt.target?.className?.match?.(/t-menu/) &&
          !evt.target?.className?.match?.(/t-nav/)
        ) {
          menuList.classList.remove('t-menu__list--open')
          menuIcon.classList.remove('t-nav__icon--close')
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
      sessionStorage.setItem('aposLoadAfterLogin', false)
      displaySnackbar(apos.page.labels.loggedInMsg, {
        type: 'success',
        dismiss: true,
      })
    }

    const justLoggedOut = sessionStorage.getItem('aposLoadAfterLogout')
    if (JSON.parse(justLoggedOut)) {
      sessionStorage.setItem('aposLoadAfterLogout', false)
      displaySnackbar(apos.page.labels.loggedOutMsg, {
        type: 'success',
        dismiss: true,
      })
    }

    const account = sessionStorage.getItem('delete')
    if (JSON.parse(account)) {
      // weird behavior where the layout is not fully loaded following a user account deletion
      // so wait for the DOM to be ready
      const snackbars = document.querySelector('[data-snackbars]')
      if (snackbars) {
        sessionStorage.setItem('delete', false)
        displaySnackbar(apos.page.labels.deleteAccount, {
          type: 'success',
          dismiss: true,
        })
      }
    }

    const customerSlug = sessionStorage.getItem('aposCustomerSlug')
    const customerLink = document.querySelector('[data-customer-link]')
    if (customerLink && customerSlug && apos.customer?.name) {
      customerLink.href = `/${apos.locale}/${apos.customer.name}/${customerSlug}`
    }
  })
}
