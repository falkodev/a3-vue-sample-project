import displayPopup from '@/popup'
import displaySnackbar from '@/snackbar'

export default async () => {
  apos.util.onReady(() => {
    if (apos.customer) {
      const { archiveAccount, yes, no, error } = apos.customer.labels
      const deleteAccount = document.querySelector('[data-disable-account]')

      deleteAccount &&
        deleteAccount.addEventListener('click', () => {
          displayPopup(archiveAccount, {
            dismiss: { label: no },
            confirm: {
              label: yes,
              action: disableCustomer,
            },
          })
        })

      const loader = document.querySelector('.apos-busy')

      async function disableCustomer() {
        try {
          loader.style.opacity = 1

          const customerId = sessionStorage.getItem('aposCustomerId')
          if (customerId) {
            await apos.http.patch(`${apos.customer.action}/${customerId}`, {
              body: JSON.stringify({
                _id: customerId,
                archived: true,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
            sessionStorage.setItem('delete', true)
            location.assign(`${apos.prefix}/`)
          }
        } catch (err) {
          displaySnackbar(error, {
            type: 'danger',
            dismiss: true,
          })
        } finally {
          loader.style.opacity = 0
        }
      }
    }
  })
}
