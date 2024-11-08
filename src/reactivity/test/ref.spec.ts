import { effect } from '../effect'
import { ref, isRef, unRef, proxyRefs } from '../ref'
import { isReactive } from '../reactive'

describe('ref', () => {
    it('happy path', () => {
        const a = ref(1)
        expect(a.value).toBe(1)
    })

    it('should be reactive', () => {
        const a = ref(1)
        let called = 0;
        let dummy
        effect(() => {
            called++;
            dummy = a.value
        })
        expect(called).toBe(1)
        expect(dummy).toBe(1)
        a.value = 2
        expect(called).toBe(2)
        expect(dummy).toBe(2)
        a.value = 2
        expect(called).toBe(2)
        expect(dummy).toBe(2)
    })

    it('should make nested properties reactive', () => {
        const a = ref({
            count: 1
        })
        let dummy
        effect(() => {
            dummy = a.value.count
        })
        expect(dummy).toBe(1)
        a.value.count = 2
        expect(dummy).toBe(2)
        // a.value.count = {}
        // expect(dummy).toBe({})
    })
    it('isRef', () => {
        const a = ref({
            count: 1
        })
        expect(isRef(a)).toBe(true)
        expect(isRef(1)).toBe(false)
        expect(isReactive(a)).toBe(false)
    })
    it('unRef', () => {
        const a = ref(1)
        expect(unRef(a)).toBe(1)
        expect(unRef(1)).toBe(1)
    })
    it('proxyRef', () => {
        const user = {
            age: ref(10),
            name: 'user'
        }
        const proxyUser = proxyRefs(user);
        expect(user.age.value).toBe(10)
        expect(proxyUser.age).toBe(10)
        expect(proxyUser.name).toBe('user')

        proxyUser.age = 20
        expect(proxyUser.age).toBe(20)
        expect(user.age.value).toBe(20)

        proxyUser.age = ref(10)
        expect(proxyUser.age).toBe(10)
        expect(user.age.value).toBe(10)
    })
})