export default function init () {
  return {
    type: 'INIT',
    payload: {
      promise: Promise.resolve([{
        id: 1,
        title: 'This.Is.A.Movie.2009-LOL',
        progress: '52.1%',
        seeds: {
          connected: 1,
          total: 5
        },
        peers: {
          connected: 2,
          total: 3
        }
      }])
    }
  }
}
