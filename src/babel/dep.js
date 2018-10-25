export default class Dep {
  constructor () {
    this.subs = []
  }

  addDepend () {
    Dep.target.addDep(this)
  }

  addSub (sub) {
    console.log(sub)
    this.subs.push(sub);
  }

  notify () {
    console.log('notify')
    for (let sub of this.subs) {
      sub.update()
    }
  }
}

Dep.target = null;
