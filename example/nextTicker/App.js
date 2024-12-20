import {
  getCurrentInstance,
  h,
  ref,
  nextTick
} from '../../lib/guide-toGvaGo-vue.esm.js';

export const App = {
  name: 'App',
  setup() {
    const count = ref(1);
    const instance = getCurrentInstance();

    async function onClick() {
      for (let i = 0; i < 100; i++) {
        console.log('update');
        count.value = i;
      }

      console.log(instance);
      nextTick(() => {
        console.log(instance);
      });

      await nextTick();
      console.log(instance);
    }

    return {
      onClick,
      count
    };
  },
  render() {
    const button = h('button', { onClick: this.onClick }, 'update');
    const p = h('p', {}, 'count: ' + this.count);

    return h('div', {}, [button, p]);
  }
};
