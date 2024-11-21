import { h } from '../../lib/guide-toGvaGo-vue.esm.js';
import { Foo } from './Foo.js';
import { createTextVNode } from '../../lib/guide-toGvaGo-vue.esm.js';

window.self = null;
export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, 'App');
    // const foo = h(Foo, {}, [h('p', {}, '123'), h('p', {}, '456')]);
    // const foo = h(Foo, {}, h('p', {}, '123'));

    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [h('p', {}, 'header: ' + age), createTextVNode('你好你好')],
        footer: () => h('p', {}, 'footer')
      }
    );
    return h('div', {}, [app, foo]);
  },
  setup() {
    return {};
  }
};
