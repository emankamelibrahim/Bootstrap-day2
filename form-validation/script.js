;(function () {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  const validateSelect = select => {
    if (select.value === '') {
      select.setCustomValidity('Please select a state.')
    } else {
      select.setCustomValidity('')
    }
  }

  const validatePattern = input => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity('Please enter a valid value.')
    } else {
      input.setCustomValidity('')
    }
  }

  const updateValidationState = field => {
    if (field.tagName === 'SELECT') {
      validateSelect(field)
    }
    if (field.id === 'inputZip') {
      validatePattern(field)
    }

    if (field.checkValidity()) {
      field.classList.remove('is-invalid')
      field.classList.add('is-valid')
    } else {
      field.classList.remove('is-valid')
      field.classList.add('is-invalid')
    }
  }

  Array.from(forms).forEach(form => {
    const stateSelect = form.querySelector('#inputState')
    const zipInput = form.querySelector('#inputZip')

    const fields = form.querySelectorAll('input, select, textarea')

    fields.forEach(field => {
      const eventType =
        field.tagName === 'SELECT' || field.type === 'checkbox'
          ? 'change'
          : 'input'
      field.addEventListener(eventType, () => {
        updateValidationState(field)
      })
    })

    form.addEventListener(
      'submit',
      event => {
        if (stateSelect) validateSelect(stateSelect)
        if (zipInput) validatePattern(zipInput)

        fields.forEach(updateValidationState)

        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      },
      false
    )
  })
})()
