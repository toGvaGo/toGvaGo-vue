import { h, renderSlots } from '../../lib/guide-toGvaGo-vue.esm.js';
export const Foo = {
  setup(props, { emit }) {
    return {};
  },
  render() {
    const foo = h('p', {}, 'foo');

    console.log('========');
    console.log(this.$slots);
    const age = 18;
    // return h('div', {}, [foo, renderSlots(this.$slots)]);
    return h('div', {}, [renderSlots(this.$slots, 'header', { age }), foo, renderSlots(this.$slots, 'footer')]);
  }
};
