
export const callHook = (vm, hook) => {
  let handle = vm.$options[hook]
  handle && handle.call(vm)
}
