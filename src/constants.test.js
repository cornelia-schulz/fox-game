const constants = require('./constants');

test('getNextHungerTime to be greater than zero', () => {
  expect(constants.getNextHungerTime(Date.now())).toBeGreaterThanOrEqual(0);
});

test('getNextDieTime to be greater than zero', () => {
  expect(constants.getNextDieTime(Date.now())).toBeGreaterThanOrEqual(0);
});

test('getNextPoopTime to be greater than zero', () => {
  expect(constants.getNextPoopTime(Date.now())).toBeGreaterThanOrEqual(0);
});