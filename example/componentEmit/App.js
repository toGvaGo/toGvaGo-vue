import { h } from '../../lib/guide-toGvaGo-vue.esm.js';
import { Foo } from './Foo.js';

window.self = null;
export const App = {
  name: 'App',
  render() {
    return h('div', {}, [
      h('div', {}, 'App'),
      h(Foo, {
        onAdd(a, b) {
          console.log('onAdd');
          // console.log('a=', a, 'b=', b);
          // console.log(a + b);
        },
        onAddFoo() {
          console.log('onAddFoo');
        }
      })
    ]);
  },
  setup() {
    return {};
  }
};
