export default () => {
  const form = document.querySelector('[data-register-form]')

  if (form) {
    const emailInput = document.querySelector('[data-input-email]')
    const passwordInput = document.querySelector('[data-input-password]')
    const lastnameInput = document.querySelector('[data-input-lastname]')
    const firstnameInput = document.querySelector('[data-input-firstname]')
    const birthdateInput = document.querySelector('[data-input-birthdate]')

    const inputArray = [
      emailInput,
      passwordInput,
      lastnameInput,
      firstnameInput,
      birthdateInput,
    ]

    const emailLabel = document.querySelector('[data-label-email]')
    const passwordLabel = document.querySelector('[data-label-password]')
    const lastNameLabel = document.querySelector('[data-label-lastname]')
    const firstNameLabel = document.querySelector('[data-label-firstname]')
    const birthdateLabel = document.querySelector('[data-label-birthdate]')

    const labelArray = [
      emailLabel,
      passwordLabel,
      lastNameLabel,
      firstNameLabel,
      birthdateLabel,
    ]

    const checkboxNewsletter = document.querySelector(
      '[data-checkbox-newsletter]',
    )
    const checkboxPersonalData = document.querySelector(
      '[data-checkbox-personal-data]',
    )
    const checkmarkPersonalData = document.querySelector(
      '[data-checkmark-personal-data]',
    )

    const checkboxArray = [checkboxNewsletter, checkboxPersonalData]

    const formError = document.querySelector('[data-label-accept-conditions]')

    const {
      minPasswordLength,
      passwordLengthMessage,
      requiredField,
      invalidEmail,
      acceptConditions,
    } = apos.register.labels

    inputArray.forEach((input) => {
      input.addEventListener('click', (evt) => {
        checkInputBirthdate(evt.target)
        removeErrorState()
      })
    })

    checkboxArray.forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
        removeErrorState()
      })
    })

    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      for (let index = 0; index < 5; index++) {
        if (!inputArray[index].value) {
          displayFieldError(inputArray[index], labelArray[index], requiredField)
          return
        } else if (
          inputArray[index] === emailInput &&
          !emailInput.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
        ) {
          displayFieldError(inputArray[index], labelArray[index], invalidEmail)
          return
        } else if (
          inputArray[index] === passwordInput &&
          passwordInput.value.length < minPasswordLength
        ) {
          displayFieldError(
            inputArray[index],
            labelArray[index],
            passwordLengthMessage,
          )
          return
        }
      }

      if (!checkboxPersonalData.checked) {
        checkmarkPersonalData.classList.add('t-checkbox__mark--error')
        displayFormError(acceptConditions)
        return
      }
      await register()
    })

    function displayFieldError(input, label, message) {
      label.innerHTML = message
      label.style.display = 'block'
      input.classList.add('t-form__input--error')
    }

    function displayFormError(error) {
      formError.innerHTML = error
      formError.style.display = 'block'
    }

    function checkInputBirthdate(target) {
      if (target.dataset.hasOwnProperty('inputBirthdate')) {
        birthdateInput.setAttribute('type', 'date')
      } else if (!birthdateInput.value) {
        birthdateInput.setAttribute('type', 'text')
      }
    }

    function removeErrorState() {
      inputArray.forEach((input) => {
        input.classList.remove('t-form__input--error')
      })

      labelArray.forEach((label) => {
        label.style.display = 'none'
      })
      checkmarkPersonalData.classList.remove('t-checkbox__mark--error')
      formError.style.display = 'none'
    }

    async function register() {
      const loader = document.querySelector('.apos-busy')

      const doc = {
        firstName: firstnameInput.value,
        lastName: lastnameInput.value,
        password: passwordInput.value,
        email: emailInput.value,
        birthDate: birthdateInput.value,
        title: `${firstnameInput.value} ${lastnameInput.value}`,
        newsletter: checkboxNewsletter.checked,
      }

      try {
        loader.style.opacity = 1
        await apos.http.post(apos.customer.action, {
          body: JSON.stringify(doc),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        window.sessionStorage.setItem('aposLoadAfterRegister', true)
        location.assign(`${apos.prefix}/login`)
      } catch (e) {
        const error = e.message || e
        displayFormError(error)
      } finally {
        loader.style.opacity = 0
      }
    }
  }
}
