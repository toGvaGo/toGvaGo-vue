import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";

export function createRenderer(options) {

    const { createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert } = options


    function render(vnode, container) {
        patch(vnode, container, null);
    }

    function patch(vnode, container, parentComponent) {
        const { shapeFlag, type } = vnode
        switch (type) {
            case Fragment:
                processFragment(vnode, container, parentComponent);
                break;
            case Text:
                processText(vnode, container);
                break;
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(vnode, container, parentComponent);
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(vnode, container, parentComponent);
                }
                break;
        }
    }

    function processElement(vnode, container, parentComponent) {
        mountElement(vnode, container, parentComponent);
    }
    function mountElement(vnode, container, parentComponent) {
        let el = (vnode.el = createElement(vnode.type));

        const { props, shapeFlag } = vnode;
        for (const key in props) {
            const val = props[key];
            patchProp(el, key, val);
        }
        const children = vnode.children;
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            el.textContent = children;
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode, el, parentComponent);
        }

        insert(el, container);
    }

    function mountChildren(vnode, container, parentComponent) {
        vnode.children.forEach(v => {
            patch(v, container, parentComponent);
        })
    }

    function processFragment(vnode, container, parentComponent) {
        mountChildren(vnode, container, parentComponent);
    }

    function processText(vnode, container) {
        const { children } = vnode;
        const textNode = (vnode.el = document.createTextNode(children));
        container.appendChild(textNode);
    }

    function processComponent(vnode: any, container: any, parentComponent: any) {
        mountComponent(vnode, container, parentComponent);
    }
    function mountComponent(initialVNode: any, container: any, parentComponent: any) {
        const instance = createComponentInstance(initialVNode, parentComponent);

        setupComponent(instance);
        setupRenderEffect(instance, initialVNode, container);
    }

    function setupRenderEffect(instance: any, initialVNode: any, container: any) {
        const { proxy } = instance
        const subTree = instance.render.call(proxy)


        patch(subTree, container, instance);

        initialVNode.el = subTree.el

    }

    return {
        createApp: createAppAPI(render)
    }
}

