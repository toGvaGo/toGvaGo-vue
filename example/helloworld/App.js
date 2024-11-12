import { h } from '../../lib/guide-toGvaGo-vue.esm.js';

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
      'hello, ' + this.title
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
