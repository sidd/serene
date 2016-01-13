import { selectedConnectionSelector } from 'selectors'

export function getStats (isRepeating) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedConnectionSelector(state).getStats())
      .payload.promise.then(() => (isRepeating && setTimeout(() => getStats(true)(dispatch, getState), 1000)))
  }
}
