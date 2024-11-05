
import { extend } from "../utils";
class ReactiveEffect {
    private _fn: any
    deps = [];
    active = true;
    onStop?: () => void

    constructor(fn, public scheduler?) {
        this._fn = fn
    }

    run() {
        activeEffect = this;

        return this._fn()
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
export function track(target, key) {
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

    //activeEffect maybe undefined
    if (!activeEffect) return

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

let activeEffect
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