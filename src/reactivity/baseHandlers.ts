import { extend, isObject } from "../utils";
import { track, trigger } from "./effect"
import { reactive, reactiveFlags, readonly, shallowReadonly } from "./reactive";


const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

function createGetter(isReadonly = false, shallow = false) {
    return (target, key) => {
        if (key === reactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === reactiveFlags.IS_READONLY) {
            return isReadonly
        }

        const res = Reflect.get(target, key)
        if (shallow) { return res }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
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
export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
})