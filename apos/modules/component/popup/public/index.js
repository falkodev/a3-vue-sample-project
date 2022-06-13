/**
 * Popup function
 * @param {string} message - required
 * @param {Object} buttons
 * @param {{label: string, action: function}} buttons.dismiss
 * @param {{label: string, action: function}} buttons.confirm
 */
export default async (message, { dismiss, confirm }) => {
  const popup = document.querySelector('[data-popup]')
  popup.innerHTML = ''

  const content = document.createElement('div')
  content.className = 't-popup__message'
  content.innerText = message
  popup.appendChild(content)

  const buttons = document.createElement('div')
  buttons.className = 't-popup__buttons'
  popup.appendChild(buttons)

  if (dismiss) {
    if (dismiss.label) {
      const dismissButton = document.createElement('button')
      dismissButton.className = 't-popup__button t-popup__button--dismiss'
      dismissButton.dataset.dismiss = ''
      dismissButton.innerText = dismiss.label
      buttons.appendChild(dismissButton)
    }
  }

  if (confirm) {
    if (confirm.label) {
      const confirmButton = document.createElement('button')
      confirmButton.className = 't-popup__button t-popup__button--confirm'
      confirmButton.dataset.confirm = ''
      confirmButton.innerText = confirm.label
      buttons.appendChild(confirmButton)

      if (confirm.action) {
        confirmButton.addEventListener('click', () => confirm.action())
      }
    }
  }

  document.body.addEventListener('click', (evt) => {
    const keepOpen = evt.target?.getAttribute('data-open-popup')
    if (!keepOpen) {
      popup.style.display = 'none'
    }
  })

  popup.style.display = 'flex'
}
