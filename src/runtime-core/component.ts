import { publicInstanceProxyHandlers } from "./componentPublicInstance"


export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {}
    }
    return component
}

export function setupComponent(instance) {
    //TODO
    // initProps()
    // initSlots()  
    setupStatefulComponent(instance)
}

export function setupStatefulComponent(instance) {
    const Component = instance.type

    instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers)

    const { setup } = Component;

    if (setup) {
        const setupResult = setup()
        handleSetupResult(instance, setupResult)
    }
}

function handleSetupResult(instance, setupResult: any) {
    // TODO
    // if function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult
    }

    finishComponentSetup(instance)
}
function finishComponentSetup(instance: any) {
    const Component = instance.type
    // if (Component.render) {
    instance.render = Component.render
    // }
}

