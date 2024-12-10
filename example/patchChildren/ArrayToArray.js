import { ref, h } from '../../lib/guide-toGvaGo-vue.esm.js';

// 左右侧对比
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C')
// ];
//1. 左侧对比
// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'E' }, 'E')
// ];

//2.右侧对比
// const nextChildren = [
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C')
// ];

//3. 新的更长
const prevChildren = [h('div', { key: 'A' }, 'A'), h('div', { key: 'B' }, 'B')];
//左侧
// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C'),
//   h('div', { key: 'D' }, 'D')
// ];
//右侧
const nextChildren = [
  h('div', { key: 'D' }, 'D'),
  h('div', { key: 'C' }, 'C'),
  h('div', { key: 'A' }, 'A'),
  h('div', { key: 'B' }, 'B')
];

//4.老的更长
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C')
// ];
//左侧
// const nextChildren = [h('div', { key: 'A' }, 'A'), h('div', { key: 'B' }, 'B')];
//右侧
// const nextChildren = [h('div', { key: 'B' }, 'B'), h('div', { key: 'C' }, 'C')];

export default {
  name: 'ArrayToText',
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;

    return {
      isChange
    };
  },
  render() {
    const self = this;

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren);
  }
};
