import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance, setupComponent } from "./component";


export function render(vnode, container) {
    patch(vnode, container);
}

function patch(vnode, container) {
    const { shapeFlag } = vnode

    if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container);
    } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container);
    }
}

function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    let el = (vnode.el = document.createElement(vnode.type));

    const { props, shapeFlag } = vnode;
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }
    const children = vnode.children;
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(children, el);
    }

    container.appendChild(el);
}

function mountChildren(vnode, container) {
    vnode.forEach(v => {
        patch(v, container);
    })
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container);
}
function mountComponent(initialVNode: any, container: any) {
    const instance = createComponentInstance(initialVNode);

    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance: any, initialVNode: any, container: any) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)


    patch(subTree, container);

    initialVNode.el = subTree.el

}

