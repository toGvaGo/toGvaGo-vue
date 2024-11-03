import { track, trigger } from "./effect"
import { reactiveFlags } from "./reactive";


const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

function createGetter(isReadonly = false) {
    return (target, key) => {
        const res = Reflect.get(target, key)
        if (key === reactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === reactiveFlags.IS_READONLY) {
            return isReadonly
        }
        if (!isReadonly) {
            track(target, key)
        }
        return res
    }
}
function createSetter() {
    return (target, key, newValue) => {
        const res = Reflect.set(target, key, newValue);

        trigger(target, key)
        return res
    }
}


export const mutableHandlers = {
    get,
    set
}

export const readonlyHandlers = {
    get: readonlyGet,

    set(target, key, newValue) {
        console.warn(`Set operation on key "${key}" failed: target is read-only.`)
        return true
    }
}