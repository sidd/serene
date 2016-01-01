export function buildModal (opts) {
  return {
    type: 'MODAL',
    payload: opts
  }
}

export function unsetModal () {
  return {
    type: 'MODAL_UNSET'
  }
}
