import { effect, reactive } from "../../reactivity"

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
})