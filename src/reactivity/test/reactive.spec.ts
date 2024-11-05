import { reactive, isReactive, isReadonly, isProxy } from "../reactive"


describe("reactive", () => {
    it("happy path", () => {
        const original = { foo: 1 };
        const observed = reactive(original);

        expect(observed).not.toBe(original);
        expect(isReactive(observed)).toBe(true);
        expect(isReactive(original)).toBe(false);
        expect(isReadonly(observed)).toBe(false);
        expect(isReadonly(original)).toBe(false);
        expect(isProxy(observed)).toBe(true);
        expect(observed.foo).toBe(1);
    })
    test("nested reactive", () => {
        const original = {
            nested: {
                foo: 1
            },
            array: [{ bar: 2 }]
        }

        const observed = reactive(original);
        expect(isReactive(observed.nested)).toBe(true);
        expect(isReactive(observed.array)).toBe(true);
        expect(isReactive(observed.array[0])).toBe(true);
    })

})