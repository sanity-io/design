// See https://on.cypress.io/custom-commands

Cypress.Commands.overwrite('visit', (originalFn, url) => {
  return originalFn({...url, url: `http://localhost:9009/.workshop/frame/?path=${url}`})
})
