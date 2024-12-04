
import { createVNode } from "./vnode";

export function createAppAPI(render) {
    return function createApp(rootComponent) {
        return {
            mount(rootContainer) {
                //将组件渲染到容器中
                const vnode = createVNode(rootComponent);

                render(vnode, rootContainer);
            }
        }
    }

}
