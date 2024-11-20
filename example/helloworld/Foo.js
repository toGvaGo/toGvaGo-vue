import { h } from '../../lib/guide-toGvaGo-vue.esm.js';
export const Foo = {
  setup(props) {
    props.count++;
    console.log(props);
  },
  render() {
    return h('div', {}, 'foo: ' + this.count);
  }
};
