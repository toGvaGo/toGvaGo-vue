import { isObject } from "../shared/index"
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers"

export const enum reactiveFlags {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly"
}

export function reactive(raw) {
    return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
    return createReactiveObject(raw, readonlyHandlers)
}

export function shallowReadonly(raw) {
    return createReactiveObject(raw, shallowReadonlyHandlers)
}

export function createReactiveObject(target, baseHandlers) {
    if (!isObject(target)) {
        console.warn(`target ${target} must be an object`)
        return target
    }
    return new Proxy(target, baseHandlers)
}

export function isReactive(value) {
    return !!value[reactiveFlags.IS_REACTIVE]
}
export function isReadonly(value) {
    return !!value[reactiveFlags.IS_READONLY]
}
export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}