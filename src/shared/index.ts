export * from './toDisplayString'

export const extend = Object.assign;
export const EMPTY_OBJ = {};
export function isObject(val) {
    return val !== null && typeof val === 'object'
}

export function isString(val) {
    return typeof val === 'string'
}

export function hasChanged(oldVal, newVal) {
    return !Object.is(oldVal, newVal)
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)

// export const isOn = (key) => key.startsWith('on');
export const isOn = (key: string) => /^on[A-Z]/.test(key);


export const camelize = (str: string) => {
    return str.replace(/-(\w)/g, (_, c: string) => {
        return c ? c.toUpperCase() : '';
    })
}

export const capitalized = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const toHandlerKey = (str: string) => {
    return str ? 'on' + capitalized(str) : '';
}
