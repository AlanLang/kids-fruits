/* Original storybook illustrations, drawn with SVG geometry. No font glyphs or remote assets. */
(function (root) {
  'use strict';
  const ink = '#514b46', cream = '#fff4d6', pink = '#f4b6b8', green = '#83b98a';
  const circle = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
  const ellipse = (x, y, rx, ry, fill) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
  const path = (d, fill, stroke = 'none', width = 3) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const rect = (x, y, w, h, r, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
  const face = (x = 50, y = 56, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${ellipse(-10, 0, 2.5, 3.4, ink)}${ellipse(10, 0, 2.5, 3.4, ink)}${ellipse(-18, 7, 5, 3, pink)}${ellipse(18, 7, 5, 3, pink)}${path('M-4 7 Q0 12 4 7', 'none', ink, 2.4)}</g>`;
  const leaf = (x = 55, y = 18) => path(`M${x} ${y} q5 -16 22 -12 q-1 17 -22 12`, green);
  const stem = path('M49 28 Q48 16 55 10', 'none', '#997250', 5);
  const wheel = (x, y, r = 10) => circle(x, y, r, ink) + circle(x, y, r * .45, cream);
  const windowPane = (x, y, w = 16, h = 15) => rect(x, y, w, h, 4, '#d9f1f0');
  const head = (color, ears = '') => ears + ellipse(50, 57, 36, 32, color);
  const roundEars = (color, inner = pink) => circle(22, 28, 14, color) + circle(78, 28, 14, color) + circle(22, 28, 8, inner) + circle(78, 28, 8, inner);
  const nose = (y = 62) => ellipse(50, y, 4, 3, ink);
  const animalFace = () => face(50, 54) + nose(63);
  const flowers = color => [0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="50" cy="27" rx="10" ry="17" fill="${color}" transform="rotate(${a} 50 48)"/>`).join('');
  const art = {
    banana: path('M24 14 Q39 60 82 39 Q80 76 46 84 Q10 88 14 54 Q31 62 24 14', '#f5d56c') + path('M24 24 Q28 77 70 58', 'none', '#d9a44e', 3) + rect(19, 10, 10, 10, 3, '#997250') + face(46, 65, .7),
    cherry: path('M29 55 Q42 21 59 16 Q68 30 72 56 M59 16 L57 10', 'none', '#83a46e', 4) + leaf(54, 21) + circle(28, 68, 21, '#e87983') + circle(71, 68, 21, '#ed9a91') + face(28, 69, .5) + face(71, 69, .5),
    peach: stem + leaf() + path('M51 32 C25 18 6 45 17 70 Q26 94 50 86 Q79 95 87 66 C94 41 74 19 51 32', '#f6b6a3') + path('M51 35 Q61 54 51 77', 'none', '#e89489', 3) + face(49, 59),
    pineapple: path('M37 33 L25 12 L45 22 L51 4 L60 23 L79 13 L66 37', green) + rect(23, 29, 55, 63, 23, '#f1c565') + path('M28 43 L64 85 M43 33 L77 71 M25 66 L59 32 M34 85 L76 43', 'none', '#dfa957', 2) + face(50, 60),
    kiwi: ellipse(50, 55, 38, 34, '#b9926a') + ellipse(50, 53, 32, 28, '#b8d68b') + ellipse(50, 53, 14, 21, cream) + [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<ellipse cx="50" cy="31" rx="1.6" ry="2.6" fill="${ink}" transform="rotate(${a} 50 53)"/>`).join('') + face(50, 53, .7),
    mango: stem + leaf() + path('M63 24 C21 15 9 57 24 78 Q45 106 73 77 Q98 43 63 24', '#f5bd6a') + path('M64 31 Q88 47 67 77', 'none', '#f2a268', 7) + face(46, 57),
    cat: head('#f1bf83', path('M17 44 L16 12 Q32 15 39 33 M62 33 Q77 12 85 13 L83 45', '#f1bf83') + path('M22 30 L22 21 L32 31 M70 31 L80 21 L79 32', pink)) + animalFace() + path('M17 61 L31 64 M16 69 L30 69 M69 64 L83 61 M70 69 L84 69', 'none', '#b28e68', 2),
    dog: path('M28 24 Q3 21 9 65 Q19 78 33 53 M71 24 Q98 20 92 65 Q82 78 69 53', '#b98c72') + head('#e9cba0') + ellipse(68, 50, 10, 15, '#b98c72') + ellipse(50, 68, 18, 12, cream) + animalFace(),
    rabbit: head('#f7e9df', ellipse(32, 25, 11, 23, '#f7e9df') + ellipse(68, 25, 11, 23, '#f7e9df') + ellipse(32, 24, 5, 16, pink) + ellipse(68, 24, 5, 16, pink)) + animalFace(),
    panda: head('#faf1dc', roundEars('#696a73', '#696a73')) + ellipse(35, 51, 10, 12, '#696a73') + ellipse(65, 51, 10, 12, '#696a73') + circle(37, 50, 3, cream) + circle(63, 50, 3, cream) + nose() + path('M45 72 Q50 77 55 72', 'none', ink, 2.5) + ellipse(25, 67, 5, 3, pink) + ellipse(75, 67, 5, 3, pink),
    fox: path('M17 45 L11 11 L39 29 L62 29 L89 11 L84 48 Q94 68 50 90 Q6 69 17 45', '#e7a073') + path('M17 49 Q37 50 50 69 Q63 50 84 49 Q82 76 50 87 Q20 76 17 49', cream) + path('M19 32 L17 22 L30 32 M72 32 L83 22 L81 34', pink) + face(50, 56) + nose(69),
    lion: circle(50, 51, 43, '#c88d59') + [0, 60, 120, 180, 240, 300].map(a => `<circle cx="50" cy="16" r="12" fill="#c88d59" transform="rotate(${a} 50 51)"/>`).join('') + head('#f4cf84', roundEars('#f4cf84')) + animalFace(),
    pig: head('#efb6bf', path('M16 44 L14 14 Q35 15 40 31 M62 31 Q77 13 87 15 L83 45', '#efb6bf')) + face(50, 50) + ellipse(50, 69, 15, 11, '#e39da9') + ellipse(44, 68, 2.5, 3, '#aa707c') + ellipse(56, 68, 2.5, 3, '#aa707c'),
    frog: head('#9bc69a', circle(29, 30, 16, '#9bc69a') + circle(71, 30, 16, '#9bc69a')) + circle(29, 29, 9, cream) + circle(71, 29, 9, cream) + circle(30, 30, 3, ink) + circle(70, 30, 3, ink) + path('M32 61 Q50 78 68 61', 'none', ink, 3) + ellipse(23, 56, 6, 4, pink) + ellipse(77, 56, 6, 4, pink),
    monkey: roundEars('#b99379', '#efcfb2') + head('#b99379') + path('M50 42 Q24 27 24 59 Q23 86 50 86 Q78 86 77 59 Q77 28 50 42', '#efcfb2') + face(50, 54) + nose(63),
    tiger: head('#edb66d', roundEars('#edb66d')) + path('M43 27 L46 39 M56 27 L54 39 M16 49 L28 53 M15 64 L28 64 M84 49 L72 53 M85 64 L72 64', 'none', '#936b50', 5) + ellipse(50, 68, 19, 12, cream) + animalFace(),
    koala: head('#b6b8c8', roundEars('#b6b8c8', '#e3d5df')) + face(50, 54) + ellipse(50, 62, 8, 11, '#797a8c'),
    bear: head('#c49c7d', roundEars('#c49c7d', '#efcfb2')) + ellipse(50, 67, 17, 14, '#efcfb2') + animalFace(),
    car: path('M16 52 L28 28 Q31 24 39 24 L64 24 Q70 24 77 49 L87 53 Q94 57 91 76 L9 76 L9 60 Q9 53 16 52', '#e78b87') + windowPane(30, 31, 17, 19) + windowPane(51, 31, 17, 19) + wheel(28, 77) + wheel(74, 77) + circle(85, 60, 4, cream) + face(50, 64, .5),
    bus: rect(10, 20, 80, 58, 13, '#edc56f') + [18, 38, 58].map(x => windowPane(x, 29, 16, 20)).join('') + rect(78, 30, 6, 36, 2, '#d9f1f0') + wheel(27, 78) + wheel(74, 78) + face(49, 63, .6),
    train: rect(15, 43, 51, 33, 7, '#88b5a6') + rect(51, 19, 32, 55, 7, '#e6a273') + rect(46, 15, 43, 8, 4, '#c58160') + rect(22, 29, 10, 23, 3, '#6c948b') + windowPane(59, 29, 17, 19) + path('M82 62 L96 79 L81 79', '#e6a273') + [25, 48, 74].map(x => wheel(x, 78, 10)).join('') + circle(27, 16, 7, '#d5e0df') + circle(16, 9, 5, '#e5ece6') + face(39, 58, .5),
    plane: path('M43 39 L14 20 Q7 19 11 29 L33 55 L13 65 L11 75 L40 69 L44 88 Q50 97 56 88 L60 69 L89 75 L87 65 L67 55 L89 29 Q93 19 86 20 L57 39 L57 18 Q50 4 43 18 Z', '#a6c6dc') + windowPane(44, 22, 12, 13) + face(50, 54, .55),
    rocket: path('M30 57 L13 72 L15 87 L36 79 M70 57 L87 72 L85 87 L64 79', '#e29c97') + path('M38 79 Q39 96 50 97 Q62 96 63 79', '#efc66b') + path('M50 7 Q17 33 32 79 L68 79 Q83 33 50 7', '#b2ced7') + path('M50 7 Q37 16 32 30 L68 30 Q63 16 50 7', '#e29c97') + circle(50, 45, 12, cream) + circle(50, 45, 8, '#8bb8c5') + face(50, 64, .5),
    boat: path('M11 65 L89 65 Q80 88 57 89 L38 89 Q20 87 11 65', '#d89a77') + path('M48 14 L48 64', 'none', '#997250', 4) + path('M43 17 L14 57 L43 57', '#c4dace') + path('M54 24 L79 57 L54 57', '#efc77d') + face(50, 74, .5) + path('M9 94 Q20 88 30 94 Q40 100 50 94 Q60 88 70 94 Q80 100 91 94', 'none', '#a2cad8', 3),
    helicopter: ellipse(50, 53, 31, 23, '#9bbeb1') + path('M27 50 L9 36 L7 61 L26 62', '#9bbeb1') + windowPane(55, 37, 22, 19) + path('M49 31 L49 17 M17 16 L84 16 M35 76 L31 85 M68 76 L71 85 M23 85 L81 85', 'none', '#788d89', 5) + face(43, 56, .45),
    firetruck: rect(8, 41, 83, 35, 7, '#e28b86') + rect(58, 25, 28, 44, 6, '#e28b86') + windowPane(64, 31, 16, 18) + rect(14, 48, 34, 18, 3, '#f3cbb1') + path('M17 30 L61 9 M20 38 L65 17 M27 25 L31 33 M39 19 L43 27 M51 13 L55 21', 'none', '#b9c9c5', 4) + wheel(27, 77) + wheel(73, 77) + face(49, 59, .4),
    tractor: wheel(34, 73, 20) + rect(28, 46, 57, 22, 5, '#97b98b') + rect(42, 20, 28, 42, 5, '#97b98b') + windowPane(48, 27, 16, 20) + rect(37, 15, 38, 8, 4, '#729b76') + path('M81 48 L81 32', 'none', '#997250', 5) + wheel(80, 77, 11) + face(66, 58, .35),
    bike: circle(24, 70, 19, '#c9e3db') + circle(77, 70, 19, '#c9e3db') + circle(24, 70, 13, cream) + circle(77, 70, 13, cream) + path('M24 70 L42 44 L55 70 Z M42 44 L68 44 L55 70 M77 70 L65 32 L76 25 M36 36 L48 36 M42 36 L42 44', 'none', '#d89a9c', 5) + face(48, 51, .35),
    teddy: roundEars('#c49c7d', '#efd1b0') + ellipse(50, 72, 26, 25, '#c49c7d') + ellipse(21, 71, 11, 16, '#c49c7d') + ellipse(79, 71, 11, 16, '#c49c7d') + ellipse(32, 89, 14, 9, '#b58e72') + ellipse(68, 89, 14, 9, '#b58e72') + ellipse(50, 75, 16, 18, '#efd1b0') + ellipse(50, 40, 29, 24, '#c49c7d') + ellipse(50, 49, 12, 10, '#efd1b0') + face(50, 37, .7) + nose(45) + path('M39 61 L50 66 L61 61 L61 73 L50 68 L39 73 Z', '#d8898b'),
    ball: circle(50, 51, 38, '#dceae1') + path('M50 29 L64 40 L59 58 L41 58 L36 40 Z M19 38 L29 27 L39 32 L36 45 L24 48 Z M62 29 L74 28 L83 41 L76 49 L64 42 Z M26 69 L39 63 L48 76 L42 86 L28 82 Z M61 63 L75 67 L73 81 L60 87 L53 77 Z', '#7d9f92') + face(50, 48, .55),
    balloon: path('M50 76 Q39 84 50 88 Q63 94 48 98', 'none', '#a39588', 2) + ellipse(50, 40, 29, 34, '#e9a8b1') + path('M50 69 L44 79 L56 79 Z', '#dc929f') + path('M31 31 Q33 21 40 19', 'none', '#ffe4df', 5) + face(50, 40),
    kite: path('M50 75 Q65 88 49 96 M52 84 L40 80 L40 89 Z M56 91 L68 87 L68 96 Z', 'none', '#ba9b82', 2) + path('M50 8 L83 43 L50 77 L17 43 Z', '#e9b2a2') + path('M50 8 L50 43 L17 43 Z', '#f0d18b') + path('M50 43 L83 43 L50 77 Z', '#a9cbbb') + face(50, 41, .7),
    drum: ellipse(50, 77, 33, 12, '#c08e76') + rect(17, 37, 66, 40, 1, '#e8ac9a') + path('M20 42 L30 73 L42 42 L54 73 L66 42 L79 73', 'none', '#ffe5b7', 3) + ellipse(50, 36, 33, 12, '#f9e8c5') + path('M18 13 L46 28 M83 13 L57 28', 'none', '#a18367', 4) + circle(17, 12, 5, '#e1bc79') + circle(84, 12, 5, '#e1bc79') + face(50, 55, .7),
    gift: rect(17, 39, 66, 50, 9, '#accabc') + rect(12, 30, 76, 16, 5, '#97b9a9') + rect(44, 31, 12, 58, 1, '#f0cd8b') + path('M48 30 Q17 27 29 13 Q44 5 50 29 Q57 4 73 13 Q85 28 53 30', '#f0cd8b') + face(50, 61, .8),
    puzzle: path('M22 16 L43 16 Q39 3 51 3 Q64 3 59 16 L81 16 L81 38 Q95 34 95 47 Q95 60 81 56 L81 80 L58 80 Q62 94 50 94 Q37 94 41 80 L18 80 L18 57 Q4 61 4 48 Q4 35 18 39 L18 20 Q18 16 22 16', '#a9c6d7') + face(50, 46),
    crayon: path('M32 30 L50 5 L68 30 L68 84 Q68 91 61 91 L39 91 Q32 91 32 84 Z', '#e4a1a8') + path('M32 30 L50 5 L68 30 Z', '#b87d86') + rect(32, 38, 36, 37, 1, '#f4d6c3') + path('M34 81 L66 81', 'none', '#be8490', 3) + face(50, 52, .65),
    guitar: path('M60 42 L69 16 L80 19 L72 47 Q85 51 79 65 Q88 88 62 94 Q33 97 30 75 Q29 59 44 58 Q43 43 60 42', '#dfb780') + circle(60, 68, 10, '#9d765e') + path('M60 81 L76 18 M53 83 L68 18', 'none', '#f9e4bd', 1.5) + rect(49, 82, 18, 4, 2, '#8d6e5c') + rect(67, 7, 18, 16, 4, '#c59573') + face(47, 73, .35),
    robot: path('M50 17 L50 8', 'none', '#8d9fa2', 4) + circle(50, 7, 5, '#e7acaa') + rect(16, 23, 68, 47, 13, '#a9c5ce') + rect(8, 37, 8, 21, 4, '#8eafb8') + rect(84, 37, 8, 21, 4, '#8eafb8') + rect(29, 72, 42, 19, 6, '#a9c5ce') + face(50, 43) + rect(38, 58, 24, 5, 2, '#f1d49c') + circle(50, 82, 4, '#e7acaa'),
    butterfly: path('M48 42 C20 1 0 29 15 51 C-2 79 32 94 47 62 M52 42 C80 1 100 29 85 51 C102 79 68 94 53 62', '#c5add8') + ellipse(26, 36, 12, 15, '#ead1e1') + ellipse(74, 36, 12, 15, '#ead1e1') + circle(27, 67, 8, '#edcda1') + circle(73, 67, 8, '#edcda1') + path('M45 29 L37 17 M55 29 L63 17', 'none', '#8c7a8f', 3) + ellipse(50, 54, 10, 29, '#a0bca4') + face(50, 40, .5),
    bee: ellipse(33, 30, 17, 19, '#d4e8e7') + ellipse(67, 30, 17, 19, '#d4e8e7') + ellipse(50, 59, 30, 28, '#f0ce7f') + path('M32 38 Q25 60 33 81 M68 38 Q75 60 67 81', 'none', '#ad936b', 7) + face(50, 56, .8) + path('M40 34 L35 22 M60 34 L65 22', 'none', '#ad936b', 3),
    ladybug: circle(50, 28, 17, '#83928b') + ellipse(50, 59, 34, 32, '#e79c9a') + path('M50 38 L50 86', 'none', '#b77d7c', 3) + [ [29,50],[72,50],[30,72],[70,72] ].map(([x,y])=>circle(x,y,6,'#b77d7c')).join('') + face(50, 27, .5) + path('M41 14 L35 7 M59 14 L65 7', 'none', '#83928b', 3),
    snail: path('M11 77 Q27 67 65 71 L68 48 Q74 35 83 47 L89 78 Q88 91 71 91 L22 91 Q7 90 11 77', '#aec8a0') + circle(40, 57, 28, '#e2ba97') + path('M40 76 Q17 66 25 48 Q34 29 52 40 Q69 54 52 65 Q40 75 34 60 Q31 48 42 48 Q52 48 46 57', 'none', '#bf967c', 4) + path('M72 45 L69 33 M82 45 L87 33', 'none', '#aec8a0', 4) + face(77, 55, .45),
    sunflower: path('M50 52 L50 94 M50 82 Q20 85 26 64 Q44 62 50 82 M50 87 Q76 87 77 68 Q58 68 50 87', green, green, 4) + flowers('#edc575') + circle(50, 48, 21, '#cba378') + face(50, 45, .75),
    tulip: path('M50 57 L50 94 M50 88 Q25 88 25 69 Q44 70 50 88 M50 83 Q75 81 76 63 Q56 63 50 83', green, green, 4) + path('M23 21 L39 32 L50 15 L62 32 L78 21 L75 49 Q69 68 50 68 Q30 68 25 49 Z', '#eab0b8') + face(50, 44, .8),
    mushroom: path('M36 54 L64 54 L71 84 Q71 95 50 95 Q29 95 29 84 Z', '#f1dfbf') + path('M8 55 Q12 13 50 11 Q89 13 92 55 Q50 68 8 55', '#dfa3a1') + circle(29, 35, 8, '#fce8d4') + circle(55, 23, 7, '#fce8d4') + circle(75, 42, 9, '#fce8d4') + face(50, 76, .65),
    tree: rect(42, 53, 16, 43, 5, '#c6a184') + circle(30, 46, 24, '#9bc29a') + circle(69, 46, 24, '#9bc29a') + circle(50, 27, 25, '#9bc29a') + circle(50, 56, 25, '#9bc29a') + face(50, 47) + leaf(24, 23),
    rainbow: path('M13 71 A37 37 0 0 1 87 71', 'none', '#e9a5a3', 13) + path('M25 71 A25 25 0 0 1 75 71', 'none', '#efd086', 11) + path('M35 71 A15 15 0 0 1 65 71', 'none', '#a7c7ae', 10) + ellipse(17, 75, 17, 11, '#e5efeb') + ellipse(83, 75, 17, 11, '#e5efeb') + face(17, 74, .4) + face(83, 74, .4),
    sun: [0,45,90,135,180,225,270,315].map(a => `<path d="M50 6 L50 15" fill="none" stroke="#edc675" stroke-width="6" stroke-linecap="round" transform="rotate(${a} 50 50)"/>`).join('') + circle(50, 50, 28, '#f1d289') + face(50, 48)
  };
  function mount() {
    const defs = document.querySelector('.art-definitions defs');
    const ns = 'http://www.w3.org/2000/svg';
    Object.entries(art).forEach(([id, drawing]) => {
      const symbol = document.createElementNS(ns, 'symbol');
      symbol.id = id; symbol.setAttribute('viewBox', '0 0 100 100');
      symbol.innerHTML = drawing;
      defs.append(symbol);
    });
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { art };
  else { root.FruitArt = { art, mount }; mount(); }
})(typeof globalThis !== 'undefined' ? globalThis : this);
