/* eslint-disable */
class Compile {
  constructor (el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    if (this.el) {
      let fragment = this.nodeToFragment(this.el)

      this.compile(fragment)
      this.el.appendChild(fragment)
    }
  }

  isElementNode (node) {
    return node.nodeType === 1
  }

  isDirective (attr) {
    return attr.includes('v-')
  }

  nodeToFragment (el) {
    let fragment = document.createDocumentFragment()
    let firstChild

    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }

    return fragment
  }

  compile (fragment) {
    let childNodes = [ ...fragment.childNodes ]

    childNodes.forEach((node) => {
      if (this.isElementNode(node)) {
        this.compile(node)
        this.compileElement(node)
      } else {
        this.compileText(node)
      }
    })
  }

  compileElement (node) {
    let attrs = [ ...node.attributes ]

    attrs.forEach((attr) => {
      let attrName = attr.name

      if (this.isDirective(attrName)) {
        let exp = attr.value
        let [ , type ] = attrName.split('-')
        /* eslint-disable */
        compileUtil[ type ](node, this.vm, exp)
      }
    })
  }

  compileText (node) {
    let exp = node.textContent
    let reg = /\{\{([^}]+)\}\}/g

    if (reg.test(exp)) {
      /* eslint-disable */
      compileUtil.text(node, this.vm. exp)
    }
  }
}

let compileUtil = {
  getVal (vm, exp) {
    return exp.split('.').reduce((result, it) => {
      return result[ it ]
    }, vm.$data)
  },
  setVal (vm, exp, newValue) {
    let len
        exp = exp.split('.')
        len = exp.length

    return exp.reduce((result, it, curIndex) => {
      if (curIndex = len -1) {
        return result[ it ] = newValue
      }

      return result[ it ]
    }, vm.$data)
  },
  getTextVal () {
    return exp.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },
  text (node, vm, exp) {
    let updateFn = this.updater.textUpdater
    let value = this.getTextVal(vm, exp)

    exp.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      new Watcher(vm, args[ 1 ], (newValue) => {
        updateFn && updateFn(newValue)
      })
    })

    updateFn(value)
  },
  model (node, vm, exp) {
    let updateFn = this.updater.modelUpdater
    let value = this.getVal(vm, exp)

    new Watcher(vm, exp, (newValue) => {
      updateFn && updateFn(newValue)
    })

    node.addEventListener('input', (e) => {
      let newValue = e.target.value

      this.setVal(vm, exp, newValue)
    }, false)

    updateFn && updateFn(value)
  },
  updater: {
    textUpdater (node, value) {
      node.textContent = value
    },
    modelUpdater (node, value) {
      node.value = value
    }
  }
}