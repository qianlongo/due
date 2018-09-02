
/* eslint-disable */
class Watcher {
  constructor (vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
  }

  get () {
    let value
    /* eslint-disable */
    Dep.target = this
    /* eslint-disable */
    value = compileUtil.getVal(this.vm, this.exp)
    /* eslint-disable */
    Dep.target = null

    return value
  }

  update () {
    /* eslint-disable */
    let newValue = compileUtil.getVal(this.vm, this.exp)
    let oldValue = this.value

    if (newValue !== oldValue) {
      this.cb(newValue)
    }
  }
}
