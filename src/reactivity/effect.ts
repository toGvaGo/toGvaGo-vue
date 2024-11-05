import { extend } from "../utils";

let activeEffect
let shouldBeTracked = true

class ReactiveEffect {
    private _fn: any
    deps = [];
    active = true;
    onStop?: () => void

    constructor(fn, public scheduler?) {
        this._fn = fn
    }

    run() {
        if (!this.active) {
            return this._fn()
        }

        shouldBeTracked = true;
        activeEffect = this;
        const result = this._fn()
        shouldBeTracked = false

        return result

    }
    stop() {
        if (this.active) {
            cleanup(this)
            if (this.onStop) {
                this.onStop()
            }
            this.active = false;
        }
    }
}

function cleanup(effect) {
    effect.deps.forEach((dep: Set<ReactiveEffect>) => {
        dep.delete(effect)
    })
}


const targetsMap = new Map();
const isTracking = () => {
    //activeEffect maybe undefined
    return shouldBeTracked && activeEffect !== undefined
}
export function track(target, key) {
    if (!isTracking()) return

    let depsMap = targetsMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetsMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }

    if (dep.has(activeEffect)) return
    //这里, 如何拿到需要被收集的依赖？（activeEffect的作用）
    dep.add(activeEffect)
    activeEffect.deps.push(dep);
}


export function trigger(target, key) {
    let depsMap = targetsMap.get(target);
    let dep = depsMap.get(key);
    dep.forEach((effect) => {
        if (effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    })
}
export function effect(fn, options: any = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler)

    extend(_effect, options)

    _effect.run()
    const runner: any = _effect.run.bind(_effect)
    runner.effcet = _effect;

    return runner
}

export function stop(runner) {
    runner.effcet.stop()
}