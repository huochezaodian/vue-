
import Dep from './dep'

export default class Watcher {
  constructor (vm, node, expression, cb) {
    this.vm = vm
    this.node = node
    this.expression = expression
    this.cb = cb
    this.value = this.getValue()
  }

  getValue () {
    Dep.target = this
    let keys = this.expression.split('.')
    let value = this.vm
    let reg = /(.+)\[(.+)\]/
    keys.forEach(key => {
      if (reg.test(key)) {
        value = value[RegExp.$1]
        value = value[RegExp.$2]
      } else {
        value = value[key]
      }
    })
    Dep.target = null
    return value;
  }

  addDep (dep) {
    dep.addSub(this)
  }

  update () {
    console.log('update')
    this.cb.call(this.vm)
  }
}
