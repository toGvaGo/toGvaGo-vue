import { readonly, isReactive, isReadonly } from "../reactive"


describe("readonly", () => {
    it("happy path", () => {
        const original = { foo: 1, bar: { baz: 2 } };
        const observed = readonly(original);

        expect(observed).not.toBe(original);
        expect(isReadonly(observed)).toBe(true);
        expect(isReadonly(original)).toBe(false);
        expect(isReactive(observed)).toBe(false);
        expect(isReactive(original)).toBe(false);
        expect(observed.foo).toBe(1);
    })
    it("warn then call set", () => {

        console.warn = jest.fn();
        const user = readonly({
            age: 10
        })

        user.age++;

        expect(console.warn).toBeCalled()
    })

})

