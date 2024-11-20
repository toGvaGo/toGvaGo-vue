import { h } from '../../lib/guide-toGvaGo-vue.esm.js';
import { Foo } from './Foo.js';

window.self = null;
export const App = {
  render() {
    window.self = this;
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'blue']
      },
      [h('span', { class: 'red' }, 'hello,' + this.title), h(Foo, { count: 1 })]
      // 'hello, ' + this.title
      // 'hello, toGvaGo'
      // [h('span', { class: 'red' }, 'hello, '), h('span', { class: 'blue' }, 'toGvaGO')]
    );
  },
  setup() {
    return {
      title: 'toGvaGo-vue1111212'
    };
  }
};
