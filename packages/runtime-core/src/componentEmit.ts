import { toHandlerKey, camelize } from "@guide-togvago-vue/shared";


export function emit(instance, event, ...args) {
    // console.log('emit', event);

    const { props } = instance;


    const handlerName = toHandlerKey(camelize(event));
    //TPP编码方法
    const handler = props[handlerName];
    handler && handler(...args);
}