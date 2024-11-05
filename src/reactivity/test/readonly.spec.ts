import { readonly, isReactive, isReadonly, shallowReadonly, isProxy } from "../reactive"


describe("readonly", () => {
    it("happy path", () => {
        const original = { foo: 1, bar: { baz: 2 } };
        const wrapped = readonly(original);

        expect(wrapped).not.toBe(original);
        expect(isReadonly(wrapped)).toBe(true);
        expect(isReadonly(original)).toBe(false);
        expect(isReactive(wrapped)).toBe(false);
        expect(isReactive(original)).toBe(false);
        expect(isReadonly(wrapped.bar)).toBe(true);
        expect(isReadonly(original.bar)).toBe(false);
        expect(isProxy(wrapped)).toBe(true);
        expect(wrapped.foo).toBe(1);
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
describe("shallow readonly", () => {
    it("happy path", () => {
        const original = { foo: 1, bar: { baz: 2 } };
        const wrapped = shallowReadonly(original);

        expect(wrapped).not.toBe(original);
        expect(isReadonly(wrapped)).toBe(true);
        expect(isReadonly(wrapped.bar)).toBe(false);
        expect(wrapped.foo).toBe(1);
    })
    it("warn then call set", () => {

        console.warn = jest.fn();
        const user = shallowReadonly({
            age: 10
        })

        user.age++;

        expect(console.warn).toBeCalled()
    })
})

