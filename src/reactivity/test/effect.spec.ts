import { effect, reactive, stop } from "../../reactivity"

describe("effcet", () => {
    it("happy path", () => {
        const user = reactive({
            age: 10
        })

        let nextAge
        effect(() => {
            nextAge = user.age + 1
        })

        expect(nextAge).toBe(11);

        user.age++
        expect(nextAge).toBe(12);
    })

    it("should return runner when call effect", () => {
        let foo = 10;
        const runner = effect(() => {
            foo++;
            return "foo"
        })

        expect(foo).toBe(11);
        const r = runner();

        expect(foo).toBe(12);
        expect(r).toBe("foo")
    })


    // vue3源码中的scheduler单元测试
    it('scheduler', () => {
        // 1. 通过 effect 的第二个参数给定 scheduler
        // 2. effect 第一次执行的时候才会执行fn
        // 3. 当响应式对象触发set的时候，不执行fn, 而是执行scheduler
        // 4. 执行runner的时候，再次执行fn
        // 这行注释用于测试一下整个git操作流程，没有其他意义
        let dummy
        let run: any
        const scheduler = jest.fn(() => {
            run = runner
        })
        const obj = reactive({ foo: 1 })
        const runner = effect(
            () => {
                dummy = obj.foo
            },
            { scheduler },
        )
        expect(scheduler).not.toHaveBeenCalled()
        expect(dummy).toBe(1)
        // should be called on first trigger
        obj.foo++
        expect(scheduler).toHaveBeenCalledTimes(1)
        // should not run yet
        expect(dummy).toBe(1)
        // manually run
        run()
        // should have run
        expect(dummy).toBe(2)
    })

    it('stop', () => {
        //stop用于停止对响应式数据的自动追踪和依赖收集，手动控制effect的生命周期
        //stop之后仍可以手动调用effect
        let dummy
        const obj = reactive({ prop: 1 })
        const runner = effect(() => {
            dummy = obj.prop
        })
        obj.prop = 2
        expect(dummy).toBe(2)
        stop(runner)
        // obj.prop = 3
        obj.prop++;
        expect(dummy).toBe(2)

        // stopped effect should still be manually callable
        runner()
        expect(dummy).toBe(3)
    })

    it('events: onStop', () => {
        const onStop = jest.fn()
        const runner = effect(() => { }, {
            onStop,
        })

        stop(runner)
        expect(onStop).toHaveBeenCalled()
    })
})