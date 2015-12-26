export function getControllers (controllers = ['rtorrent']) {
  controllers = controllers
    .reduce(
      (res, c) => {
        res[c] = require('serene-rtorrent')
        return res
      }, {})

  return {
    type: 'CONTROLLERS',
    payload: {
      promise: Promise.resolve(controllers)
    }
  }
}

export function setController (active) {
  return {
    type: 'CONTROLLER_SET',
    payload: {
      active
    }
  }
}
