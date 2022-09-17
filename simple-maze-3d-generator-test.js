import longestLen from './factorial.js';
test('abcabcbb', () => {
  expect(longestLen("abcabcbb")).toBe(3);
});
test('pwwkew', () => {
  expect(longestLen("pwwkew")).toBe(3);
});
test('bbbbbbb', () => {
  expect(longestLen('bbbbbbb')).toBe(1);
});