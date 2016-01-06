import HumanizeDuration from 'humanize-duration'

/**
 * Asserts whether or not `obj` contains `{ didInvalidate: true }`
 * @param  {Object}  obj
 * @return {Boolean}
 */
export function isInvalid (obj) {
  if (obj !== null && typeof obj !== 'object') {
    throw new Error('`obj` must be an object.')
  }
  return obj && obj.didInvalidate === true
}

/**
 * Asserts whether or not `obj` is an empty object.
 * @param  {Object}  obj
 * @return {Boolean}
 */
export function isEmpty (obj) {
  if (obj !== null && typeof obj !== 'object') {
    throw new Error('`obj` must be an object.')
  }
  return Object.keys(obj).length === 0
}

/**
 * A custom `HumanizeDuration` humanizer that is more terse.
 * @return {Function}
 * @see    https://www.npmjs.com/package/humanize-duration#humanizers
 */
export const humanize = HumanizeDuration.humanizer({
  language: 'short',
  delimiter: ' ',
  spacer: '',
  languages: {
    short: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms'
    }
  }
})
