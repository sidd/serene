import HumanizeDuration from 'humanize-duration'
export function isInvalid (obj) {
  if (obj !== null && typeof obj !== 'object') {
    throw new Error('`obj` must be an object.')
  }
  return obj && obj.didInvalidate === true
}

export function isEmpty (obj) {
  if (obj !== null && typeof obj !== 'object') {
    throw new Error('`obj` must be an object.')
  }
  return Object.keys(obj).length === 0
}

// goodness gracious
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
