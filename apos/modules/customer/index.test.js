const customer = require('./index')
const apos = require('apostrophe')
test('update title', () => {
  const updateTitle = customer.handlers(apos).beforeInsert.updateTitle
  const doc = {
    firstName: 'Roland',
    lastName: 'Garros',
  }
  expect(updateTitle(doc)).toEqual({
    ...doc,
    title: 'Roland Garros',
  })
})
