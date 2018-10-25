import Vue from './babel/main'

let app = new Vue({
  el: '#app',
  data: {
    number: 0,
    arr: [0],
    names: ['a', 'b', 'c'],
    show: false,
    obj: {
      key: 0
    }
  },
  computed: {
    sum () {
      return this.number + this.obj.key
    }
  },
  methods: {
    increase () {
      this.number ++
    },
    arrIncrease () {
      this.arr[0] ++
    },
    objIncrease () {
      this.obj.key ++
    },
    handleShow () {
      this.show = !this.show
    }
  },
  created () {
    console.log('created:  ', this)
  },
  mounted () {
    console.log('mounted:  ', this)
  }
})

console.log(app)
