import { createComponentInstance, setupComponent } from "./component";


export function render(vnode, container) {
    patch(vnode, container);
}

function patch(vnode, container) {

    //TODO
    //判断是 element 类型还是 component 类型
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
    let el = document.createElement(vnode.type);

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
function mountComponent(vnode: any, container: any) {
    const instance = createComponentInstance(vnode);

    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container: any) {
    const subTree = instance.render();


    patch(subTree, container);

}

