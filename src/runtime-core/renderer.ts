import { createComponentInstance, setupComponent } from "./component";


export function render(vnode, container) {
    patch(vnode, container);
}

function patch(vnode, container) {

    //TODO
    //判断是 element 类型还是 component 类型
    //processElement();
    processComponent(vnode, container);
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