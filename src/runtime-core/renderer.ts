import { createComponentInstance, setupComponent } from "./component";


export function render(vnode, container) {
    patch(vnode, container);
}

function patch(vnode, container) {
    console.log(vnode.type);
    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    } else if (typeof vnode.type === 'object') {
        processComponent(vnode, container);
    }
}

function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    let el = (vnode.el = document.createElement(vnode.type));

    const { props } = vnode;
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }
    const children = vnode.children;
    if (typeof children === 'string') {
        el.textContent = children;
    } else if (Array.isArray(children)) {
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

