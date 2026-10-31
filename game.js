/* The generator assigns each fruit pair while peeling the layout from the top.
   Every fruit appears exactly twice, so removing an available pair cannot strand
   another pair. Each newly generated board has a complete removal order. */
(function (root) {
  'use strict';
  const fruits = [
    { id: 'apple', name: '苹果' }, { id: 'orange', name: '橘子' },
    { id: 'strawberry', name: '草莓' }, { id: 'grape', name: '葡萄' },
    { id: 'watermelon', name: '西瓜' }, { id: 'pear', name: '梨子' }
  ];
  const themes = [
    { name: '水果乐园', items: [...fruits,
      { id: 'banana', name: '香蕉' }, { id: 'cherry', name: '樱桃' },
      { id: 'peach', name: '桃子' }, { id: 'pineapple', name: '菠萝' },
      { id: 'kiwi', name: '猕猴桃' }, { id: 'mango', name: '芒果' }
    ] },
    { name: '动物朋友', items: [
      { id: 'cat', name: '小猫' }, { id: 'dog', name: '小狗' },
      { id: 'rabbit', name: '小兔' }, { id: 'panda', name: '熊猫' },
      { id: 'fox', name: '狐狸' }, { id: 'lion', name: '狮子' },
      { id: 'pig', name: '小猪' }, { id: 'frog', name: '青蛙' },
      { id: 'monkey', name: '猴子' }, { id: 'tiger', name: '老虎' },
      { id: 'koala', name: '考拉' }, { id: 'bear', name: '小熊' }
    ] },
    { name: '出发去旅行', items: [
      { id: 'car', name: '汽车' }, { id: 'bus', name: '公交车' },
      { id: 'train', name: '火车' }, { id: 'plane', name: '飞机' },
      { id: 'rocket', name: '火箭' }, { id: 'boat', name: '帆船' },
      { id: 'helicopter', name: '直升机' }, { id: 'firetruck', name: '消防车' },
      { id: 'tractor', name: '拖拉机' }, { id: 'bike', name: '自行车' }
    ] },
    { name: '玩具百宝箱', items: [
      { id: 'teddy', name: '玩具熊' }, { id: 'ball', name: '足球' },
      { id: 'balloon', name: '气球' }, { id: 'kite', name: '风筝' },
      { id: 'drum', name: '小鼓' }, { id: 'gift', name: '礼物' },
      { id: 'puzzle', name: '拼图' }, { id: 'crayon', name: '蜡笔' },
      { id: 'guitar', name: '吉他' }, { id: 'robot', name: '机器人' }
    ] },
    { name: '花园探险', items: [
      { id: 'butterfly', name: '蝴蝶' }, { id: 'bee', name: '蜜蜂' },
      { id: 'ladybug', name: '瓢虫' }, { id: 'snail', name: '蜗牛' },
      { id: 'sunflower', name: '向日葵' }, { id: 'tulip', name: '郁金香' },
      { id: 'mushroom', name: '蘑菇' }, { id: 'tree', name: '大树' },
      { id: 'rainbow', name: '彩虹' }, { id: 'sun', name: '太阳' }
    ] }
  ];
  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function pairCount(level) {
    if (level < 8) return 3 + Math.floor(level / 2);
    if (level < 12) return 8;
    if (level < 16) return 10;
    if (level < 20) return 12;
    if (level < 25) return 16;
    if (level < 30) return 20;
    return 24;
  }
  function availableTiles(tiles) {
    const live = new Set(tiles.filter(tile => !tile.removed).map(tile => tile.id));
    return tiles.filter(tile => !tile.removed && tile.blockers.every(id => !live.has(id)));
  }
  function createRound(level, previousSignature = '', random = Math.random) {
    const count = pairCount(level), positions = [];
    const baseRows = count === 3 ? 2 : 3;
    for (let row = 0; row < baseRows; row++) {
      for (let col = 0; col < 2; col++) positions.push({ x: col * 1.12, y: row * 1.12, z: 0 });
    }
    const upperRows = count >= 5 ? 2 : 1;
    const upperStart = count === 4 && random() > .5 ? 2.24 : 0;
    for (let row = 0; row < upperRows; row++) {
      for (let col = 0; col < 2; col++) positions.push({ x: .26 + col * 1.12, y: upperStart + row * 2.24, z: 1 });
    }
    if (count === 6) {
      const topY = random() > .5 ? 0 : 2.24;
      for (let col = 0; col < 2; col++) positions.push({ x: .52 + col * 1.12, y: topY, z: 2 });
    }
    if (count >= 8) {
      positions.length = 0;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) positions.push({ x: col * 1.12, y: row * 1.12, z: 0 });
      }
      const rows = count >= 10 ? [0, 1, 2, 3] : [0, 3];
      for (const row of rows) {
        for (let col = 0; col < 2; col++) positions.push({ x: .25 + col * 1.12, y: row * 1.12, z: 1 });
      }
      if (count === 12) {
        for (const row of [0, 3]) {
          for (let col = 0; col < 2; col++) positions.push({ x: .5 + col * 1.12, y: row * 1.12, z: 2 });
        }
      }
    }
    if (count >= 16) {
      positions.length = 0;
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) positions.push({ x: col * 1.12, y: row * 1.12, z: 0 });
      }
      const middleRows = count === 16 ? [0, 5] : count === 20 ? [0, 2, 5] : [0, 2, 3, 5];
      middleRows.forEach(row => {
        for (let col = 0; col < 4; col++) positions.push({ x: .24 + col * 1.12, y: row * 1.12, z: 1 });
      });
      const topRows = count === 20 ? [2] : count === 24 ? [0, 5] : [];
      topRows.forEach(row => {
        for (let col = 0; col < 4; col++) positions.push({ x: .48 + col * 1.12, y: row * 1.12, z: 2 });
      });
    }
    const width = Math.max(...positions.map(p => p.x + 1));
    if (random() > .5) positions.forEach(p => { p.x = width - p.x - 1; });
    const tiles = positions.map((p, id) => ({ ...p, id, removed: false, blockers: [] }));
    tiles.forEach(tile => {
      tile.blockers = tiles.filter(other => other.z > tile.z &&
        Math.min(tile.x + 1, other.x + 1) - Math.max(tile.x, other.x) > .001 &&
        Math.min(tile.y + 1, other.y + 1) - Math.max(tile.y, other.y) > .001
      ).map(other => other.id);
    });
    const previousTheme = previousSignature.split(':')[0];
    const choices = themes.filter(theme => theme.name !== previousTheme);
    const theme = choices[Math.floor(random() * choices.length)];
    const others = shuffle(themes.filter(t => t !== theme).flatMap(t => t.items), random);
    const pool = [...shuffle(theme.items, random), ...others].slice(0, count);
    for (const fruit of pool) {
      const open = shuffle(availableTiles(tiles), random).sort((a, b) => b.z - a.z);
      if (open.length < 2) throw new Error('Layout must expose a pair');
      open.slice(0, 2).forEach(tile => { tile.fruit = fruit; tile.removed = true; });
    }
    tiles.forEach(tile => { tile.removed = false; });
    const signature = () => theme.name + ':' + tiles.map(t => `${t.x},${t.y},${t.z}:${t.fruit.id}`).join('|');
    if (signature() === previousSignature) {
      const remap = new Map(pool.map((fruit, i) => [fruit.id, pool[(i + 1) % pool.length]]));
      tiles.forEach(tile => { tile.fruit = remap.get(tile.fruit.id); });
    }
    return { tiles, signature: signature(), pairs: count, layers: Math.max(...tiles.map(t => t.z)) + 1, theme: count > theme.items.length ? theme.name + '和小伙伴' : theme.name };
  }
  const api = { fruits, themes, shuffle, pairCount, availableTiles, createRound };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FruitGame = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
