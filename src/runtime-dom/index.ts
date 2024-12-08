import { createRenderer } from '../runtime-core'
import { isOn } from '../shared';

function createElement(type) {
    // console.log('createElement--------------------------')
    return document.createElement(type);
}

function patchProp(el, key, prevVal, nextval) {
    // console.log('patchProp--------------------------')
    if (isOn(key)) {
        const event = key.slice(2).toLowerCase();
        el.addEventListener(event, nextval);
    } else {
        if (nextval === null || nextval === undefined) {
            el.removeAttribute(key);
        } else {
            el.setAttribute(key, nextval);
        }
    }
}

function insert(el, parent) {
    // console.log('insert--------------------------')
    // container.appendChild(el);
    parent.append(el);
}

const renderer: any = createRenderer({
    createElement,
    patchProp,
    insert
})


export function createApp(...args) {
    return renderer.createApp(...args)
}

export * from '../runtime-core';