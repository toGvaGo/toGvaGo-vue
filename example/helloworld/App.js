import { h } from '../../lib/guide-toGvaGo-vue.esm.js';

export const App = {
  render() {
    return h('div', {}, 'hello, ' + this.title);
  },
  setup() {
    return {
      title: 'toGvaGo-vue'
    };
  }
};
