import { createRenderer } from '../../lib/guide-toGvaGo-vue.esm.js';
import { App } from './App.js';

console.log(PIXI);

const game = new PIXI.Application();
await game.init({ width: 640, height: 360 });

document.body.append(game.canvas);

const renderer = createRenderer({
  createElement(type) {
    if (type === 'rect') {
      const rect = new PIXI.Graphics();
      rect.fill(0xff0000);
      rect.rect(0, 0, 100, 100);
      rect.fill();
      return rect;
    }
  },
  patchProp(el, key, val) {
    el[key] = val;
  },
  insert(el, parent) {
    parent.addChild(el);
  }
});

renderer.createApp(App).mount(game.stage);

// const rootContainer = document.getElementById('app');
// createApp(App).mount(rootContainer);
