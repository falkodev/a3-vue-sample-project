export default () => {
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
    })
  }
}