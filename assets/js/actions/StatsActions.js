import { selectedControllerSelector } from '../selectors'

export function getStats (isRepeating) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(selectedControllerSelector(state).getStats())
      .payload.promise.then(() => (isRepeating && setTimeout(() => getStats(true)(dispatch, getState), 1000)))
  }
}
