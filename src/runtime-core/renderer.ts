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
        patch(null, vnode, container, null, null);
    }

    //n1 -> 旧节点
    //n2 -> 新节点
    function patch(n1, n2, container, parentComponent, anchor) {
        const { shapeFlag, type } = n2
        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, parentComponent, anchor);
                break;
            case Text:
                processText(n1, n2, container);
                break;
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1, n2, container, parentComponent, anchor);
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container, parentComponent, anchor);
                }
                break;
        }
    }

    function processElement(n1, n2, container, parentComponent, anchor) {
        if (!n1) {
            mountElement(n2, container, parentComponent, anchor);
        } else {
            patchElement(n1, n2, container, parentComponent, anchor);
        }
    }

    function patchElement(n1, n2, container, parentComponent, anchor) {
        console.log('patchElement')
        console.log('n1', n1);
        console.log('n2', n2);

        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        const el = (n2.el = n1.el);

        patchChildren(n1, n2, el, parentComponent, anchor);
        patchProps(el, oldProps, newProps);
    }

    function patchChildren(n1, n2, container, parentComponent, anchor) {
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
                mountChildren(c2, container, parentComponent, anchor);
            } else {
                //array diff array
                patchKeyedChildren(c1, c2, container, parentComponent, anchor);
            }
        }
    }

    function patchKeyedChildren(c1, c2, container, parentComponent, parentAnchor) {
        const l2 = c2.length
        let i = 0;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;

        function isSameVNodeType(n1, n2) {
            return n1.type === n2.type && n1.key === n2.key
        }
        //左侧
        while (i <= e1 && i <= e2) {
            const n1 = c1[i];
            const n2 = c2[i];
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, parentAnchor)
            } else {
                break;
            }
            i++;
        }

        //右侧
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = c2[e2];
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, parentAnchor)
            } else {
                break;
            }
            e1--;
            e2--;
        }
        console.log(i, e1, e2);
        //新的更长
        if (i > e1) {
            if (i <= e2) {
                const nextPos = e2 + 1;
                const anchor = nextPos < l2 ? c2[nextPos].el : null
                while (i <= e2) {
                    patch(null, c2[i], container, parentComponent, anchor)
                    i++;
                }
            }
        } else if (i > e2) {//老的更长
            while (i <= e1) {
                hostRemove(c1[i].el);
                i++;
            }
        } else {
            //TODO
            //乱序部分
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

    function mountElement(vnode, container, parentComponent, anchor) {
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
            mountChildren(vnode.children, el, parentComponent, anchor);
        }

        hostInsert(el, container, anchor);
    }

    function mountChildren(children, container, parentComponent, anchor) {
        children.forEach(v => {
            patch(null, v, container, parentComponent, anchor);
        })
    }

    function processFragment(n1, n2, container, parentComponent, anchor) {
        mountChildren(n2.children, container, parentComponent, anchor);
    }

    function processText(n1, n2, container) {
        const { children } = n2;
        const textNode = (n2.el = document.createTextNode(children));
        container.appendChild(textNode);
    }

    function processComponent(n1: any, n2: any, container: any, parentComponent: any, anchor) {
        mountComponent(n2, container, parentComponent, anchor);
    }
    function mountComponent(initialVNode: any, container: any, parentComponent: any, anchor) {
        const instance = createComponentInstance(initialVNode, parentComponent);

        setupComponent(instance);
        setupRenderEffect(instance, initialVNode, container, anchor);
    }

    function setupRenderEffect(instance: any, initialVNode: any, container: any, anchor) {
        effect(() => {

            if (!instance.isMounted) {
                console.log('init')
                const { proxy } = instance
                const subTree = (instance.subTree = instance.render.call(proxy))
                console.log(subTree);

                patch(null, subTree, container, instance, anchor);

                initialVNode.el = subTree.el

                instance.isMounted = true
            } else {
                console.log('update')
                const { proxy } = instance
                const subTree = instance.render.call(proxy);
                const prevSubTree = instance.subTree;
                instance.subTree = subTree;

                patch(prevSubTree, subTree, container, instance, anchor);
            }
        })
    }

    return {
        createApp: createAppAPI(render)
    }
}

