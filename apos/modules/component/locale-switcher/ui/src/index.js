export default () => {
  const localeSwitcher = document.querySelector('[data-locale-switcher]')

  if (localeSwitcher) {
    localeSwitcher.addEventListener('click', () => {
      const localeList = document.querySelector('[data-locale-list]')
      const display = localeList.style.display || 'none'
      localeList.style.display = display === 'none' ? 'flex' : 'none'
    })
  }
}
