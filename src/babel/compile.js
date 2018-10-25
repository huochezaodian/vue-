
let regOperate = /[|&:?%*/+-]+/g
let reg = /\{\{(.*?)\}\}/g
let regKey = /^(?![.\[\]\d]$)[.\[\]\da-zA-Z]+$/
let regArrKey = /(.+)\[(.+)\]/

export default class Compile {
  constructor (vm) {
    vm.$el = document.querySelector(vm.$options.el)
    this.initDom(vm.$el, vm)
  }

  initDom (parentNode, vm) {
    let childNodes = parentNode.childNodes;
    Array.from(childNodes).forEach(node => {
      let text = node.textContent

      if (node.nodeType === 3 && reg.test(text)) { // 即是文本节点又有大括号的情况{{}}
        // let keys = RegExp.$1
        // let val = this.getValue(vm, keys)
        // node.textContent = text.replace(reg, val).trim()
        // vm.$watch(node, keys, () => {
        //   node.textContent = text.replace(reg, this.getValue(vm, keys)).trim()
        // })
        this.parseJsExpression(node, RegExp.$1, vm)
      }

      if (node.nodeType === 1){ // 元素节点
        let nodeAttr = node.attributes
        Array.from(nodeAttr).forEach(attr => {
          let name = attr.name
          let value = attr.value
          if (name.includes('v-model') || name.includes('v-bind')) {
            node.value = this.getValue(vm, value)

            vm.$watch(node, value, () => {
              node.value = this.getValue(vm, value)
            })
          }

          if (name.includes('v-model')) {
            node.addEventListener('input', e => {
              let newVal = e.target.value
              let val = vm
              value.split('.').forEach((key, i) => {
                if (i === value.split('.').length -1) {
                  console.log(val, newVal)
                  val[key] = newVal
                  return
                }
                val = val[key]
              })
            })
          }

          if (name.includes('v-on')) {
            let event = name.split(':')[1]

            node.addEventListener(event, e => {
              vm.$options.methods[value].call(vm)
            })
          }

        })

        if (node.hasChildNodes()) {
          this.initDom(node, vm)
        }
      }
    })
  }

  // 解析js表达式
  parseJsExpression (node, expression, vm) {
    let arrVar = []
    let match = null
    let curIndex = 0
    let text = node.textContent
    while (match = regOperate.exec(expression)) {
      arrVar.push(expression.slice(curIndex, match.index))
      arrVar.push(match[0])
      curIndex = match.index + match[0].length
    }
    arrVar.push(expression.slice(curIndex))

    node.textContent = text.replace(reg, this.executeJsExpression(arrVar, vm))
    arrVar.forEach(item => {
      if (regKey.test(item.trim()) && !regOperate.test(item)) {
        vm.$watch(node, item.trim(), () => {
          node.textContent = text.replace(reg, this.executeJsExpression(arrVar, vm))
        })
      }
    })
  }

  // 执行js表达式
  executeJsExpression (arrVar, vm) {
    let expression = arrVar.map(item => {
      if (regKey.test(item.trim()) && !regOperate.test(item)) {
        return this.getValue(vm, item)
      }
      return item
    }).join('')

    let fn = new Function(`return ${expression}`)
    return fn.call(vm)
  }

  getValue (vm, keys) {
    let val = vm
    keys.trim().split('.').forEach(key => {
      if (regArrKey.test(key)) {
        val = val[RegExp.$1]
        val = val[RegExp.$2]
      } else {
        val = val[key]
      }
    })
    return val
  }
}
