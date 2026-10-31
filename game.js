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
      { id: 'banana', name: '香蕉', emoji: '🍌' }, { id: 'cherry', name: '樱桃', emoji: '🍒' },
      { id: 'peach', name: '桃子', emoji: '🍑' }, { id: 'pineapple', name: '菠萝', emoji: '🍍' },
      { id: 'kiwi', name: '猕猴桃', emoji: '🥝' }, { id: 'mango', name: '芒果', emoji: '🥭' }
    ] },
    { name: '动物朋友', items: [
      { id: 'cat', name: '小猫', emoji: '🐱' }, { id: 'dog', name: '小狗', emoji: '🐶' },
      { id: 'rabbit', name: '小兔', emoji: '🐰' }, { id: 'panda', name: '熊猫', emoji: '🐼' },
      { id: 'fox', name: '狐狸', emoji: '🦊' }, { id: 'lion', name: '狮子', emoji: '🦁' },
      { id: 'pig', name: '小猪', emoji: '🐷' }, { id: 'frog', name: '青蛙', emoji: '🐸' },
      { id: 'monkey', name: '猴子', emoji: '🐵' }, { id: 'tiger', name: '老虎', emoji: '🐯' },
      { id: 'koala', name: '考拉', emoji: '🐨' }, { id: 'bear', name: '小熊', emoji: '🐻' }
    ] },
    { name: '出发去旅行', items: [
      { id: 'car', name: '汽车', emoji: '🚗' }, { id: 'bus', name: '公交车', emoji: '🚌' },
      { id: 'train', name: '火车', emoji: '🚂' }, { id: 'plane', name: '飞机', emoji: '✈️' },
      { id: 'rocket', name: '火箭', emoji: '🚀' }, { id: 'boat', name: '帆船', emoji: '⛵' },
      { id: 'helicopter', name: '直升机', emoji: '🚁' }, { id: 'firetruck', name: '消防车', emoji: '🚒' },
      { id: 'tractor', name: '拖拉机', emoji: '🚜' }, { id: 'bike', name: '自行车', emoji: '🚲' }
    ] },
    { name: '玩具百宝箱', items: [
      { id: 'teddy', name: '玩具熊', emoji: '🧸' }, { id: 'ball', name: '足球', emoji: '⚽' },
      { id: 'balloon', name: '气球', emoji: '🎈' }, { id: 'kite', name: '风筝', emoji: '🪁' },
      { id: 'drum', name: '小鼓', emoji: '🥁' }, { id: 'gift', name: '礼物', emoji: '🎁' },
      { id: 'puzzle', name: '拼图', emoji: '🧩' }, { id: 'crayon', name: '蜡笔', emoji: '🖍️' },
      { id: 'guitar', name: '吉他', emoji: '🎸' }, { id: 'robot', name: '机器人', emoji: '🤖' }
    ] },
    { name: '花园探险', items: [
      { id: 'butterfly', name: '蝴蝶', emoji: '🦋' }, { id: 'bee', name: '蜜蜂', emoji: '🐝' },
      { id: 'ladybug', name: '瓢虫', emoji: '🐞' }, { id: 'snail', name: '蜗牛', emoji: '🐌' },
      { id: 'sunflower', name: '向日葵', emoji: '🌻' }, { id: 'tulip', name: '郁金香', emoji: '🌷' },
      { id: 'mushroom', name: '蘑菇', emoji: '🍄' }, { id: 'tree', name: '大树', emoji: '🌳' },
      { id: 'rainbow', name: '彩虹', emoji: '🌈' }, { id: 'sun', name: '太阳', emoji: '☀️' }
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
  function pairCount(level) { return Math.min(6, 3 + Math.floor(level / 2)); }
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
    const pool = shuffle(theme.items, random).slice(0, count);
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
    return { tiles, signature: signature(), pairs: count, layers: count === 6 ? 3 : 2, theme: theme.name };
  }
  const api = { fruits, shuffle, pairCount, availableTiles, createRound };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FruitGame = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
