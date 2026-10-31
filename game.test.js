const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRound, availableTiles } = require('./game.js');

function randomGenerator(seed) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
}
function checkEveryPath(tiles, visited = new Set()) {
  const key = tiles.filter(t => t.removed).map(t => t.id).join(',');
  if (visited.has(key)) return;
  visited.add(key);
  if (tiles.every(t => t.removed)) return;
  const open = availableTiles(tiles);
  const pairs = open.flatMap((a, i) => open.slice(i + 1).filter(b => a.fruit.id === b.fruit.id).map(b => [a, b]));
  assert.ok(pairs.length > 0, 'Every reachable state has a playable pair');
  for (const [a, b] of pairs) {
    a.removed = b.removed = true;
    checkEveryPath(tiles, visited);
    a.removed = b.removed = false;
  }
}

test('random layered rounds remain solvable after every possible pair choice', () => {
  for (let seed = 1; seed <= 150; seed++) {
    for (const level of [1, 2, 4, 6, 50, 10000]) {
      const round = createRound(level, '', randomGenerator(seed));
      assert.equal(round.tiles.length, round.pairs * 2);
      assert.ok(round.pairs >= 3 && round.pairs <= 6);
      assert.ok(round.tiles.some(t => t.blockers.length > 0));
      const counts = new Map();
      round.tiles.forEach(t => counts.set(t.fruit.id, (counts.get(t.fruit.id) || 0) + 1));
      assert.ok([...counts.values()].every(n => n === 2));
      const open = availableTiles(round.tiles);
      assert.ok(open.length >= 2 && open.length < round.tiles.length);
      assert.ok(open.every(t => t.blockers.length === 0));
      checkEveryPath(round.tiles);
    }
  }
});

test('a new round changes theme and layout signature even with the same random seed', () => {
  for (let seed = 1; seed <= 50; seed++) {
    const first = createRound(6, '', randomGenerator(seed));
    const next = createRound(6, first.signature, randomGenerator(seed));
    assert.notEqual(first.theme, next.theme);
    assert.notEqual(first.signature, next.signature);
  }
});
