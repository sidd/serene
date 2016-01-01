export function getControllers (controllers = ['rtorrent']) {
  controllers = controllers.map(c => require('serene-rtorrent'))

  return {
    type: 'CONTROLLERS',
    payload: controllers
  }
}

export function setController (active) {
  return {
    type: 'CONTROLLERS_SET',
    payload: active
  }
}
