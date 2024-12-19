import { createRenderer } from '@guide-togvago-vue/runtime-core';
import { isOn } from '@guide-togvago-vue/shared';

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

function insert(child, parent, anchor) {
    // console.log('insert--------------------------')
    // container.appendChild(el);
    // parent.append(el);
    parent.insertBefore(child, anchor || null);
}

function remove(child) {
    const parent = child.parentNode;
    if (parent) {
        parent.removeChild(child);
    }
}

function setElementText(el, text) {
    el.textContent = text
}

const renderer: any = createRenderer({
    createElement,
    patchProp,
    insert,
    remove,
    setElementText
})


export function createApp(...args) {
    return renderer.createApp(...args)
}

export * from '@guide-togvago-vue/runtime-core';