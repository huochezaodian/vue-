import { initData, initComputed } from './observer'
import Compile from './compile'
import { callHook } from './lifecycle'
import Watcher from './watcher'

export default class Vue {
  constructor (options) {
    const vm = this
    vm.$options = options
    vm._data = options.data
    vm._computed = options.computed
    vm.$watch = (node, expression, cb) => {
      new Watcher(vm, node, expression, cb)
    }

    initData(vm._data)
    for (let key in vm._data) {
      proxy(vm, '_data', key)
    }

    initComputed(vm, vm._computed)
    for (let key in vm._computed) {
      proxy(vm, '_computed', key)
    }

    callHook(vm, 'created')
    new Compile(vm)
    callHook(vm, 'mounted')
  }
}

export const proxy = (target, sourceKey, key) => {
  Object.defineProperty(target, key, {
    configurable: true,
    get: function proxyGetter () {
      return target[sourceKey][key]
    },
    set: function proxySetter (newVal) {
      target[sourceKey][key] = newVal
    }
  })
}

export const proxyComputed = (target, sourceKey, key) => {
  Object.defineProperty(target, key, {
    configurable: true,
    get: function proxyGetter () {
      return target[sourceKey][key]
    },
    set () {}
  })
}

window.Vue = Vue
