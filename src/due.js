/* eslint-disable */
class Due {
  constructor (options) {
    let { el, data } = options

    this.$el = el
    this.$data = data

    if (this.$el) {
      new Observer(this.$data)
      this.proxyData(this.$data)
      new Compile(this.$el, this)
    }
  }

  proxyData (data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get () {
          return data[ key ]
        },
        set (newVal) {
          data[ key ] = newVal
        }
      })
    })
  }
}