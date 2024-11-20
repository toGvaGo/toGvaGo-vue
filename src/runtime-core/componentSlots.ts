import { ShapeFlags } from "../shared/shapeFlags";

export function initSlots(instance, children) {
    // instance.slots = Array.isArray(children) ? children : [children]
    const { vnode } = instance

    if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        normalizeObjectSlots(instance.slots, children)
    }

}

function normalizeObjectSlots(slots: any, children: any) {
    for (const key in children) {
        const value = children[key];

        slots[key] = (props) => normalizeSlot(value(props));
    }
}


function normalizeSlot(value) {
    return Array.isArray(value) ? value : [value]
}