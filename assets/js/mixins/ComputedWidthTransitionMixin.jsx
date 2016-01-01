export default () => ({
  componentDidMount () {
    const ref = this.refs.root
    // get width before next tick
    const width = window.getComputedStyle(ref).width

    // on next tick, transition to computed width
    setImmediate(() => {
      ref.style.width = width
    })
  }
})
