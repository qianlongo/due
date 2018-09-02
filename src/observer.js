/* eslint-disable */
class Observer {
  constructor (data) {
    this.observe(data)
  }

  observe (data) {
    if (!data || typeof data !== 'object') {
      return
    }

    Object.keys(data).forEach((key) => {
      let value = data[ key ]

      this.defineReactive(data, key, value)
      this.observe(value)
    })
  }

  defineReactive (obj, key, value) {
    /* eslint-disable */
    let dep = new Dep()

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        /* eslint-disable */
        Dep.target && dep.addSub(Dep.target)

        return value
      },
      set: (newValue) => {
        if (newValue !== value) {
          this.observe(newValue)
          value = newValue
          dep.notify()
        }
      }
    })
  }
}
