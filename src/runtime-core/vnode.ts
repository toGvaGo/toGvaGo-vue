import { ShapeFlags } from "../shared/shapeFlags"


export function createVNode(type, props?, children?) {
    const vnode = {
        type,
        props,
        children,
        el: null,
        shapeFlag: getShapeFlag(type)
    }
    if (typeof children === 'string') {
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
    } else if (Array.isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
    }

    if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT && typeof children === 'object') {
        vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
    }

    return vnode
}

function getShapeFlag(type) {
    return typeof type === 'string'
        ? ShapeFlags.ELEMENT
        : ShapeFlags.STATEFUL_COMPONENT
}