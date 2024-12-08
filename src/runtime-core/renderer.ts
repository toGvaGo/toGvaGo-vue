import { effect } from "../reactivity";
import { EMPTY_OBJ } from "../shared";
import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";

export function createRenderer(options) {

    const {
        createElement: hostCreateElement,
        patchProp: hostPatchProp,
        insert: hostInsert,
        remove: hostRemove,
        setElementText: hostSetElementText
    } = options


    function render(vnode, container) {
        patch(null, vnode, container, null);
    }

    //n1 -> 旧节点
    //n2 -> 新节点
    function patch(n1, n2, container, parentComponent) {
        const { shapeFlag, type } = n2
        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, parentComponent);
                break;
            case Text:
                processText(n1, n2, container);
                break;
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1, n2, container, parentComponent);
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container, parentComponent);
                }
                break;
        }
    }

    function processElement(n1, n2, container, parentComponent) {
        if (!n1) {
            mountElement(n2, container, parentComponent);
        } else {
            patchElement(n1, n2, container, parentComponent);
        }
    }

    function patchElement(n1, n2, container, parentComponent) {
        console.log('patchElement')
        console.log('n1', n1);
        console.log('n2', n2);

        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        const el = (n2.el = n1.el);

        patchChildren(n1, n2, el, parentComponent);
        patchProps(el, oldProps, newProps);
    }

    function patchChildren(n1, n2, container, parentComponent) {
        const prevShapeFlag = n1.shapeFlag;
        const c1 = n1.children;
        const shapeFlag = n2.shapeFlag;
        const c2 = n2.children;
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                //将旧的array清空
                unmounteChildren(n1.children);
            }
            if (c1 !== c2) {
                hostSetElementText(container, c2);
            }
        } else {
            if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
                hostSetElementText(container, '');
                mountChildren(c2, container, parentComponent);
            }
        }
    }

    function unmounteChildren(children) {
        for (let i = 0; i < children.length; i++) {
            const el = children[i].el;
            hostRemove(el);
        }
    }

    function patchProps(el, oldProps, newProps) {
        if (oldProps !== newProps) {
            for (const key in newProps) {
                const prevProp = oldProps[key];
                const nextProp = newProps[key];
                if (prevProp !== nextProp) {
                    hostPatchProp(el, key, prevProp, nextProp);
                }
            }

            if (oldProps !== EMPTY_OBJ) {
                for (const key in oldProps) {
                    if (!(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null)
                    }
                }
            }
        }
    }

    function mountElement(vnode, container, parentComponent) {
        let el = (vnode.el = hostCreateElement(vnode.type));

        const { props, shapeFlag } = vnode;
        for (const key in props) {
            const val = props[key];
            hostPatchProp(el, key, null, val);
        }
        const children = vnode.children;
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            el.textContent = children;
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode.children, el, parentComponent);
        }

        hostInsert(el, container);
    }

    function mountChildren(children, container, parentComponent) {
        children.forEach(v => {
            patch(null, v, container, parentComponent);
        })
    }

    function processFragment(n1, n2, container, parentComponent) {
        mountChildren(n2.children, container, parentComponent);
    }

    function processText(n1, n2, container) {
        const { children } = n2;
        const textNode = (n2.el = document.createTextNode(children));
        container.appendChild(textNode);
    }

    function processComponent(n1: any, n2: any, container: any, parentComponent: any) {
        mountComponent(n2, container, parentComponent);
    }
    function mountComponent(initialVNode: any, container: any, parentComponent: any) {
        const instance = createComponentInstance(initialVNode, parentComponent);

        setupComponent(instance);
        setupRenderEffect(instance, initialVNode, container);
    }

    function setupRenderEffect(instance: any, initialVNode: any, container: any) {
        effect(() => {

            if (!instance.isMounted) {
                console.log('init')
                const { proxy } = instance
                const subTree = (instance.subTree = instance.render.call(proxy))
                console.log(subTree);

                patch(null, subTree, container, instance);

                initialVNode.el = subTree.el

                instance.isMounted = true
            } else {
                console.log('update')
                const { proxy } = instance
                const subTree = instance.render.call(proxy);
                const prevSubTree = instance.subTree;
                instance.subTree = subTree;

                patch(prevSubTree, subTree, container, instance);
            }
        })
    }

    return {
        createApp: createAppAPI(render)
    }
}

