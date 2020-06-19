const init = require('./init');

test('inittest', () => {
  expect(true).toBeTruthy();
})

test('inittest', () => {
  expect(init.init()).toBeCalled();
})