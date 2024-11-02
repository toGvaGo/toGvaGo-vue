
import { track, trigger } from "./effect"

export function reactive(object) {
    return new Proxy(object, {
        get(target, key) {
            const res = Reflect.get(target, key)

            track(target, key)
            return res
        },

        set(target, key, newValue) {
            const res = Reflect.set(target, key, newValue);

            trigger(target, key)
            return res
        }
    })
}