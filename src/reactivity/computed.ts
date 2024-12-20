import { ReactiveEffect } from "./effect"


class computedImpl {
    private _dirty: boolean = true
    private _value: any
    private _effect: any

    constructor(getter) {
        // scheduler的妙用
        this._effect = new ReactiveEffect(getter, () => {
            if (!this._dirty) {
                this._dirty = true
            }
        })
    }

    get value() {
        if (this._dirty) {
            this._dirty = false
            this._value = this._effect.run();
        }
        return this._value
    }
}


export function computed(getter) {
    return new computedImpl(getter)
}