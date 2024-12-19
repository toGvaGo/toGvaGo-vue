import { ref } from '../../dist/guide-toGvaGo-vue.esm.js';

window.self = null;
export const App = {
  name: 'App',
  template: `<div>h1,{{count}}</div>`,
  setup() {
    const count = (window.count = ref(1));
    return {
      count
    };
  }
};
