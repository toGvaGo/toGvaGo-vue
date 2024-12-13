import { publicInstanceProxyHandlers } from "./componentPublicInstance"
import { initProps } from "./componentProps"
import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit";
import { initSlots } from "./componentSlots";
import { proxyRefs } from "../reactivity";


export function createComponentInstance(vnode, parent) {
    console.log("createComponentInstance", parent)
    const component = {
        vnode,
        type: vnode.type,
        next: null,
        setupState: {},
        props: {},
        slots: {},
        provides: parent ? parent.provides : {},
        parent,
        isMounted: false,
        subTree: {},
        emit: () => { }
    }

    component.emit = emit.bind(null, component) as any;

    return component
}

export function setupComponent(instance) {
    initProps(instance, instance.vnode.props)
    initSlots(instance, instance.vnode.children)
    setupStatefulComponent(instance)
}

export function setupStatefulComponent(instance: any) {
    const Component = instance.type

    instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers)

    const { setup } = Component;

    if (setup) {
        setCurrentInstance(instance)
        const setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit
        })
        setCurrentInstance(null)
        handleSetupResult(instance, setupResult)
    }
}

function handleSetupResult(instance, setupResult: any) {
    // TODO
    // if function
    if (typeof setupResult === 'object') {
        instance.setupState = proxyRefs(setupResult)
    }

    finishComponentSetup(instance)
}
function finishComponentSetup(instance: any) {
    const Component = instance.type
    // if (Component.render) {
    instance.render = Component.render
    // }
}

let currentInstance = null
export function getCurrentInstance() {
    return currentInstance
}

export function setCurrentInstance(instance) {
    currentInstance = instance
}

