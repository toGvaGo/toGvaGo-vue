import { h, getCurrentInstance } from '../../lib/guide-toGvaGo-vue.esm.js';
import { Foo } from './Foo.js';

window.self = null;
export const App = {
  name: 'App',
  render() {
    return h('div', {}, [h('p', {}, 'currentInstance demo'), h(Foo)]);
  },
  setup() {
    const instance = getCurrentInstance();
    console.log('App', instance);
  }
};
