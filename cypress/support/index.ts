const RE_RESIZE_OBSERVER_LOOP_ERROR = /^ResizeObserver loop limit exceeded/

Cypress.on('uncaught:exception', (err) => {
  // Ignore resize observer loop errors
  if (RE_RESIZE_OBSERVER_LOOP_ERROR.test(err.message)) {
    return false
  }

  return true
})
