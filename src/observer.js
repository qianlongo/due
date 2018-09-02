/* eslint-disable */class Observer {
  constructor (data) {
    this.observe(data)
  }

  observe (data) {
    if (!data || typeof data !== 'object') {
      return
    }

    Object.keys(data).forEach((key) => {
      let val = data[ key ]

      this.defineReactive(data, key, val)
      this.observe(val)
    })
  }

  defineReactive (obj, key, val) {
    /* eslint-disable */
    let dep = new Dep()

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        /* eslint-disable */
        Dep.target && dep.addSub(Dep.target)

        return val
      },
      set: (newVal) => {
        if (newVal !== val) {
          this.observe(newVal)
          val = newVal
          dep.notify()
        }
      }
    })
  }
}
