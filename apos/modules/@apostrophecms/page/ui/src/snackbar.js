/**
 * Notification function
 * @param {string} message - required
 * @param {{type: ('danger'|'info'|'success'), dismiss: boolean|number}} [options] - optional
 */

export default (message, { type = 'info', dismiss } = {}) => {
  const snackbars = document.querySelector('[data-snackbars]')
  const snackbar = document.createElement('div')
  const closeIcon = document.createElement('div')
  snackbar.className = 't-snackbar'

  const statusIcon = document.createElement('div')
  statusIcon.classList.add(
    't-snackbar__icon',
    't-snackbar__icon--badge',
    `t-snackbar__icon--${type}`,
  )
  statusIcon.innerHTML =
    '<svg fill="currentColor" width="12" height="12" viewBox="0 0 24 24">' +
    '<path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z">' +
    '</path>' +
    '</svg>'
  snackbar.appendChild(statusIcon)

  const messageDiv = document.createElement('div')
  messageDiv.className = 't-snackbar__text'
  messageDiv.textContent = message
  snackbar.appendChild(messageDiv)

  closeIcon.classList.add('t-snackbar__icon', 't-snackbar__icon--close')
  closeIcon.innerHTML =
    '<svg fill="white" width="14" height="14" viewBox="0 0 24 24">' +
    '<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">' +
    '<title>Close Notification</title>' +
    '</path>' +
    '</svg>'
  snackbar.appendChild(closeIcon)

  if (dismiss) {
    const delay = Number.isInteger(parseInt(dismiss))
      ? parseInt(dismiss) * 1000
      : 5000
    setTimeout(() => (snackbar.style.display = 'none'), delay)
  }

  closeIcon.addEventListener('click', () => (snackbar.style.display = 'none'))
  snackbars.appendChild(snackbar)
}
