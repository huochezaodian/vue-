import Dep from './dep'

class Observer {
  constructor (data) {
    this.dep = new Dep()
    this.init(data)
  }

  init (obj) {
    Object.keys(obj).forEach(key => {
      initData(obj[key])
      this.defineReactive(obj, key, obj[key])
    })
  }

  defineReactive (obj, key, value) {
    let dep = this.dep
    Object.defineProperty(obj, key, {
      // configurable: true,
      // enumerable: true,
      get () {
        if (Dep.target) {
          dep.addDepend()
        }
        return value
      },
      set (newVal) {
        if (newVal === value) return
        value = newVal
        initData(newVal)
        dep.notify()
      }
    })
  }
}

export default Observer

export const initData = (value) => {
  if (!value || typeof value !== 'object') return
  return new Observer(value)
}

export const initComputed = (vm, data) => {
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'object') {
      initComputed(data[key])
    }
    Object.defineProperty(data, key, {
      get: typeof data[key] === 'function' ? data[key].bind(vm) : data[key].get,
      set () {}
    })
  })
}
