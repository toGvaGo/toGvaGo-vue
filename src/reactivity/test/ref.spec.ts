import { effect } from '../effect'
import { ref } from '../ref'

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
})