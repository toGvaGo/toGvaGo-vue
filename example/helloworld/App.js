import { h } from '../../lib/guide-toGvaGo-vue.esm.js';

export const App = {
  render() {
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'blue']
      },
      // 'hello, ' + this.title
      // 'hello, toGvaGo'
      [h('span', { class: 'red' }, 'hello, '), h('span', { class: 'blue' }, 'toGvaGO')]
    );
  },
  setup() {
    return {
      title: 'toGvaGo-vue'
    };
  }
};
