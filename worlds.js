// Worlds: one per animal. Each has its own scene, ambient effect and enemies.
// Art is plain SVG (100x100 viewBox) so it stays crisp and tiny.

const svgDoc = body => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>${body}</svg>`;

// ---------- Humans ----------
// Every human shares one body; hats, hair, faces and tools make them different.
const INK = '#1b1b2f';

const HATS = {
  straw: `<ellipse cx='46' cy='32' rx='27' ry='5' fill='#e8c46a'/><path d='M32 32 Q33 17 46 17 Q59 17 60 32Z' fill='#e8c46a'/><rect x='33' y='26' width='26' height='4' fill='#b5452f'/>`,
  hunter: `<rect x='26' y='36' width='8' height='14' rx='3' fill='#e8631a'/><rect x='58' y='36' width='8' height='14' rx='3' fill='#e8631a'/><path d='M28 38 Q29 21 46 21 Q63 21 64 38Z' fill='#ff7a1a'/><ellipse cx='58' cy='38' rx='13' ry='3.5' fill='#c9590f'/>`,
  surgical: `<path d='M28 42 Q28 22 46 22 Q64 22 64 42 Q46 35 28 42Z' fill='#5fd3c3'/>`,
  backCap: `<path d='M28 38 Q29 22 46 22 Q63 22 64 38Z' fill='#2f6fdc'/><ellipse cx='30' cy='37' rx='10' ry='3.5' fill='#1f4fa8'/><circle cx='46' cy='23' r='2' fill='#1f4fa8'/>`,
  propeller: `<path d='M28 38 Q29 22 46 22 Q63 22 64 38Z' fill='#ff5c8a'/><path d='M46 22 L46 38' stroke='#ffd23f' stroke-width='5'/><path d='M46 22 L46 14' stroke='${INK}' stroke-width='2'/><ellipse cx='38' cy='13' rx='8' ry='2.5' fill='#3ef0ff'/><ellipse cx='54' cy='13' rx='8' ry='2.5' fill='#5fd35f'/>`,
  chef: `<rect x='31' y='22' width='30' height='12' rx='2' fill='#ffffff' stroke='#d8dbe6' stroke-width='1.5'/><circle cx='36' cy='19' r='9' fill='#fff'/><circle cx='46' cy='14' r='10' fill='#fff'/><circle cx='56' cy='19' r='9' fill='#fff'/>`,
  hardHat: `<path d='M27 40 Q27 19 46 19 Q65 19 65 40Z' fill='#ffc53d'/><rect x='23' y='37' width='46' height='5' rx='2' fill='#e0a200'/><path d='M46 19 L46 37' stroke='#e0a200' stroke-width='4'/>`,
  beanie: `<path d='M28 40 Q28 19 46 19 Q64 19 64 40Z' fill='#2f4a7a'/><rect x='27' y='34' width='38' height='7' rx='3' fill='#233a62'/><circle cx='46' cy='17' r='5' fill='#e8eefc'/>`,
  bucket: `<path d='M31 34 Q32 20 46 20 Q60 20 61 34Z' fill='#9c8a5a'/><path d='M22 37 Q46 28 70 37 L67 41 Q46 34 25 41Z' fill='#857448'/>`,
  topHat: `<rect x='34' y='6' width='24' height='26' rx='2' fill='${INK}'/><rect x='34' y='24' width='24' height='4' fill='#ff5c8a'/><ellipse cx='46' cy='32' rx='22' ry='4' fill='${INK}'/>`,
  rain: `<ellipse cx='46' cy='38' rx='25' ry='6' fill='#e6b800'/><path d='M28 38 Q28 19 46 19 Q64 19 64 38Z' fill='#ffd23f'/>`,
};

const FACE = {
  angry: `<path d='M35 41 L43 44 M57 41 L49 44' stroke='${INK}' stroke-width='2.4' stroke-linecap='round'/>` +
    `<circle cx='40' cy='48' r='2.6' fill='${INK}'/><circle cx='52' cy='48' r='2.6' fill='${INK}'/>` +
    `<path d='M40 58 Q46 54 52 58' stroke='${INK}' stroke-width='2.2' fill='none' stroke-linecap='round'/>`,
  grin: `<path d='M35 42 L43 43 M57 42 L49 43' stroke='${INK}' stroke-width='2.2' stroke-linecap='round'/>` +
    `<circle cx='40' cy='48' r='2.6' fill='${INK}'/><circle cx='52' cy='48' r='2.6' fill='${INK}'/>` +
    `<path d='M39 55 Q46 62 53 55Z' fill='${INK}'/><path d='M41 56 L51 56' stroke='#fff' stroke-width='1.5'/>`,
  masked: `<path d='M35 41 L43 44 M57 41 L49 44' stroke='${INK}' stroke-width='2.4' stroke-linecap='round'/>` +
    `<circle cx='40' cy='48' r='2.6' fill='${INK}'/><circle cx='52' cy='48' r='2.6' fill='${INK}'/>` +
    `<rect x='36' y='52' width='20' height='10' rx='4' fill='#d9f4f8'/><path d='M36 55 L28 50 M56 55 L64 50' stroke='#d9f4f8' stroke-width='1.5'/>`,
};

const EXTRAS = {
  beard: c => `<path d='M29 50 Q29 71 46 73 Q63 71 63 50 Q59 61 46 61 Q33 61 29 50Z' fill='${c}'/>`,
  mustache: c => `<path d='M37 55 Q41 51 46 54 Q51 51 55 55 Q51 57 46 55 Q41 57 37 55Z' fill='${c}'/>`,
  curlyMustache: `<path d='M46 54 Q40 50 36 54 Q34 57 37 57 M46 54 Q52 50 56 54 Q58 57 55 57' stroke='${INK}' stroke-width='2.5' fill='none' stroke-linecap='round'/>`,
  hood: `<circle cx='46' cy='48' r='26' fill='#7a4e30'/><circle cx='46' cy='48' r='23' fill='none' stroke='#f3ebe0' stroke-width='6' stroke-dasharray='2.5 2.5'/>`,
  bowtie: `<path d='M40 70 L46 73 L40 76Z M52 70 L46 73 L52 76Z' fill='#ff5c8a'/>`,
  hiVis: `<path d='M28 86 L66 86' stroke='#e8f0ff' stroke-width='4'/>`,
  plaid: `<path d='M34 72 L34 100 M46 70 L46 100 M58 72 L58 100 M26 84 L66 84 M24 94 L68 94' stroke='#7a1f16' stroke-width='2.5' opacity='.7'/>`,
  straps: `<path d='M36 72 L36 100 M56 72 L56 100' stroke='#2a4f8a' stroke-width='4'/>`,
  buttons: `<circle cx='46' cy='80' r='1.8' fill='#b8bdd0'/><circle cx='46' cy='88' r='1.8' fill='#b8bdd0'/><circle cx='46' cy='96' r='1.8' fill='#b8bdd0'/>`,
};

// Tools are held in the raised right hand, which sits at about (77, 55).
const WOOD = '#8a5a2b';
const METAL = '#c3cad6';
const TOOLS = {
  pitchfork: `<path d='M71 97 L86 16' stroke='${WOOD}' stroke-width='4' stroke-linecap='round'/>` +
    `<path d='M76 20 Q86 25 96 18 M76 20 L77 4 M86 22 L87 5 M96 18 L96 3' stroke='${METAL}' stroke-width='3.5' fill='none' stroke-linecap='round'/>`,
  net: `<path d='M77 58 L86 27' stroke='${WOOD}' stroke-width='4' stroke-linecap='round'/>` +
    `<circle cx='88' cy='16' r='11' fill='rgba(255,255,255,.15)' stroke='#d8dde6' stroke-width='3'/>` +
    `<path d='M79 11 L97 21 M79 21 L97 11 M88 5 L88 27 M77 16 L99 16' stroke='#d8dde6' stroke-width='1.2'/>`,
  bugNet: `<path d='M77 58 L86 27' stroke='#5fd35f' stroke-width='4' stroke-linecap='round'/>` +
    `<circle cx='88' cy='16' r='11' fill='rgba(255,179,200,.35)' stroke='#ff9ec0' stroke-width='3'/>` +
    `<path d='M80 12 L96 20 M80 20 L96 12 M88 5 L88 27' stroke='#ff9ec0' stroke-width='1.2'/>`,
  syringe: `<g transform='rotate(22 77 55)'><rect x='71' y='24' width='12' height='28' rx='2' fill='#eef9ff' stroke='#8aa4b8' stroke-width='1.5'/>` +
    `<rect x='73' y='34' width='8' height='16' fill='#7fe7a0'/><path d='M77 24 L77 8' stroke='#9aa7b4' stroke-width='1.8'/>` +
    `<rect x='73' y='52' width='8' height='5' fill='#8aa4b8'/><rect x='70' y='57' width='14' height='3' rx='1' fill='#8aa4b8'/></g>`,
  waterPistol: `<g transform='rotate(-25 77 55)'><path d='M71 60 L71 45 L97 45 Q101 45 101 49 L101 53 L81 53 L81 60Z' fill='#3ef0ff'/>` +
    `<rect x='73' y='40' width='13' height='6' rx='2' fill='#ff5c8a'/></g>` +
    `<circle cx='94' cy='27' r='3' fill='#7fd8ff'/><circle cx='91' cy='18' r='2.4' fill='#7fd8ff'/><circle cx='96' cy='11' r='2' fill='#7fd8ff'/>`,
  pan: `<path d='M77 56 L84 37' stroke='#3a3a44' stroke-width='5' stroke-linecap='round'/>` +
    `<circle cx='87' cy='22' r='14' fill='#2b2b35'/><circle cx='87' cy='22' r='10.5' fill='#454552'/>` +
    `<ellipse cx='87' cy='22' rx='6.5' ry='5.5' fill='#fff'/><circle cx='88' cy='22' r='2.8' fill='#ffc53d'/>`,
  hammer: `<path d='M77 58 L86 21' stroke='${WOOD}' stroke-width='5' stroke-linecap='round'/>` +
    `<g transform='rotate(-15 86 17)'><rect x='73' y='10' width='26' height='13' rx='2' fill='#9aa3b5'/><rect x='73' y='10' width='7' height='13' rx='1' fill='#6f7788'/></g>`,
  saw: `<g transform='rotate(-28 77 55)'><rect x='71' y='50' width='12' height='11' rx='3' fill='#c0392b'/>` +
    `<path d='M74 50 L74 14 L91 19 L85 50Z' fill='#d3dae4'/>` +
    `<path d='M74 16 L77 18 L74 21 L77 24 L74 27 L77 30 L74 33 L77 36 L74 39 L77 42 L74 45 L77 48' stroke='#8a93a3' fill='none' stroke-width='1.3'/></g>`,
  rake: `<path d='M71 97 L88 13' stroke='${WOOD}' stroke-width='4' stroke-linecap='round'/>` +
    `<path d='M77 16 L99 11' stroke='${METAL}' stroke-width='4' stroke-linecap='round'/>` +
    `<path d='M79 16 L80 23 M84 15 L85 22 M89 14 L90 21 M94 13 L95 20 M98 12 L99 19' stroke='${METAL}' stroke-width='2.5' stroke-linecap='round'/>`,
  wand: `<path d='M77 56 L90 25' stroke='${INK}' stroke-width='4' stroke-linecap='round'/><path d='M88 29 L90 25' stroke='#fff' stroke-width='4' stroke-linecap='round'/>` +
    `<path d='M95 12 L96.5 16 L100 17 L96.5 18 L95 22 L93.5 18 L90 17 L93.5 16Z' fill='#ffd23f'/>` +
    `<path d='M83 12 L84 14.5 L86.5 15 L84 15.5 L83 18 L82 15.5 L79.5 15 L82 14.5Z' fill='#fff3b0'/>`,
  rod: `<path d='M76 60 Q84 30 99 5' stroke='#6b4a2b' stroke-width='3' fill='none' stroke-linecap='round'/>` +
    `<path d='M99 5 Q100 26 95 38' stroke='#e6e9f0' stroke-width='1' fill='none'/>` +
    `<ellipse cx='94' cy='43' rx='6' ry='3.5' fill='#7fd8ff'/><path d='M99 43 L103 40 L103 46Z' fill='#7fd8ff'/>`,
  icePick: `<path d='M77 58 L86 22' stroke='#4a6fa5' stroke-width='4.5' stroke-linecap='round'/>` +
    `<path d='M75 23 Q86 13 99 24 L97 27 Q86 19 77 26Z' fill='${METAL}'/>`,
};

function human({ skin, shirt, hat = null, tool, face = 'angry', extras = [], behind = '', hair = null }) {
  return svgDoc(
    behind +
    `<path d='M22 100 Q22 69 46 67 Q70 69 70 100Z' fill='${shirt}'/>` +
    `<circle cx='28' cy='49' r='4' fill='${skin}'/><circle cx='64' cy='49' r='4' fill='${skin}'/>` +
    `<circle cx='46' cy='47' r='18' fill='${skin}'/>` +
    (hair ? `<path d='M28 44 Q30 28 46 28 Q62 28 64 44 Q58 36 46 36 Q34 36 28 44Z' fill='${hair}'/>` : '') +
    FACE[face] + extras.join('') + (hat ? HATS[hat] : '') +
    `<path d='M62 74 L76 57' stroke='${shirt}' stroke-width='8' stroke-linecap='round'/>` +
    TOOLS[tool] +
    `<circle cx='77' cy='55' r='4.8' fill='${skin}'/>`);
}

const HUMANS = {
  farmer: { name: 'Farmer', svg: human({ skin: '#f1c27d', shirt: '#4a7fc9', hat: 'straw', tool: 'pitchfork', extras: [EXTRAS.straps] }) },
  hunter: { name: 'Hunter', svg: human({ skin: '#e0ac69', shirt: '#56733a', hat: 'hunter', tool: 'net', extras: [EXTRAS.mustache('#6b3f1f')] }) },
  vet: { name: 'Vet', svg: human({ skin: '#c68642', shirt: '#9fdde8', hat: 'surgical', tool: 'syringe', face: 'masked' }) },
  splashKid: { name: 'Splash Kid', svg: human({ skin: '#f5d0a9', shirt: '#ff9a3c', hat: 'backCap', tool: 'waterPistol', face: 'grin' }) },
  bugKid: { name: 'Bug Kid', svg: human({ skin: '#8d5524', shirt: '#ffd23f', hat: 'propeller', tool: 'bugNet', face: 'grin' }) },
  chef: { name: 'Chef', svg: human({ skin: '#f1c27d', shirt: '#f4f5fb', hat: 'chef', tool: 'pan', extras: [EXTRAS.mustache('#5a3a22'), EXTRAS.buttons] }) },
  builder: { name: 'Builder', svg: human({ skin: '#e0ac69', shirt: '#ff8c1a', hat: 'hardHat', tool: 'hammer', extras: [EXTRAS.hiVis] }) },
  lumberjack: { name: 'Lumberjack', svg: human({ skin: '#f1c27d', shirt: '#c0392b', hat: 'beanie', tool: 'saw', extras: [EXTRAS.plaid, EXTRAS.beard('#7a4a22')] }) },
  gardener: { name: 'Gardener', svg: human({ skin: '#c68642', shirt: '#6fa85a', hat: 'bucket', tool: 'rake', extras: [EXTRAS.straps] }) },
  magician: { name: 'Magician', svg: human({ skin: '#f5d0a9', shirt: '#3a2a6a', hat: 'topHat', tool: 'wand', extras: [EXTRAS.curlyMustache, EXTRAS.bowtie] }) },
  fisherman: { name: 'Fisherman', svg: human({ skin: '#e0ac69', shirt: '#ffd23f', hat: 'rain', tool: 'rod', extras: [EXTRAS.beard('#eef1f6')] }) },
  explorer: { name: 'Explorer', svg: human({ skin: '#f1c27d', shirt: '#d9534f', tool: 'icePick', behind: EXTRAS.hood }) },
};

// ---------- Thrown objects ----------
const OBJECTS = {
  pinecone: svgDoc(
    `<path d='M50 16 L50 6' stroke='#5a3a1a' stroke-width='4' stroke-linecap='round'/>` +
    `<ellipse cx='50' cy='55' rx='27' ry='38' fill='#7a4a22'/>` +
    [28, 40, 52, 64, 76].map((y, i) => {
      const w = [14, 22, 26, 24, 16][i];
      return `<path d='M${50 - w} ${y} Q${50 - w / 2} ${y + 8} 50 ${y} Q${50 + w / 2} ${y + 8} ${50 + w} ${y}' stroke='#b07a45' stroke-width='4' fill='none' stroke-linecap='round'/>`;
    }).join('')),
  waterDrop: svgDoc(
    `<path d='M50 6 Q80 48 74 66 A25 25 0 1 1 26 66 Q20 48 50 6Z' fill='#4fb8f0'/>` +
    `<path d='M50 14 Q72 48 68 64 A19 19 0 0 1 50 84' stroke='#9fdcff' stroke-width='3' fill='none' opacity='.6'/>` +
    `<ellipse cx='38' cy='62' rx='6' ry='10' fill='#fff' opacity='.55' transform='rotate(20 38 62)'/>`),
  rock: svgDoc(
    `<path d='M50 12 L80 20 L94 46 L86 76 L60 92 L30 88 L10 66 L8 38 L26 18Z' fill='#6f7a74'/>` +
    `<path d='M50 12 L80 20 L94 46 L70 36 L40 30 L26 18Z' fill='#8e9a93'/>` +
    `<path d='M16 64 Q28 56 38 66 Q30 74 16 64Z' fill='#5fae6b'/><path d='M62 78 Q72 70 82 76 Q74 84 62 78Z' fill='#5fae6b'/>` +
    `<circle cx='56' cy='56' r='6' fill='#5c6660'/>`),
  brick: svgDoc(
    `<path d='M14 34 L24 24 L90 24 L80 34Z' fill='#e0785c'/><path d='M80 34 L90 24 L90 66 L80 76Z' fill='#8e3a26'/>` +
    `<rect x='14' y='34' width='66' height='42' rx='3' fill='#c0533a'/>` +
    `<circle cx='32' cy='55' r='5' fill='#8e3a26'/><circle cx='47' cy='55' r='5' fill='#8e3a26'/><circle cx='62' cy='55' r='5' fill='#8e3a26'/>`),
  flowerPot: svgDoc(
    `<path d='M50 44 L50 20' stroke='#3f8f3f' stroke-width='4'/><path d='M50 36 Q38 28 34 36 Q42 42 50 36Z M50 32 Q62 24 66 32 Q58 38 50 32Z' fill='#5fbf5f'/>` +
    [0, 72, 144, 216, 288].map(a => `<ellipse cx='50' cy='11' rx='5' ry='8' fill='#ff7aa2' transform='rotate(${a} 50 19)'/>`).join('') +
    `<circle cx='50' cy='19' r='5' fill='#ffd23f'/>` +
    `<rect x='22' y='44' width='56' height='12' rx='3' fill='#d9744a'/><path d='M27 56 L73 56 L66 94 L34 94Z' fill='#c0603a'/>`),
  snowball: svgDoc(
    `<circle cx='50' cy='50' r='40' fill='#f4f8ff'/><path d='M22 66 A40 40 0 0 0 86 60 A34 34 0 0 1 22 66Z' fill='#cfdcf0'/>` +
    `<circle cx='36' cy='36' r='7' fill='#fff'/><circle cx='62' cy='44' r='3' fill='#dfe8f5'/><circle cx='46' cy='60' r='4' fill='#dfe8f5'/>`),
};

// ---------- Scene painters (static background, drawn once per resize/world change) ----------
function gradientSky(g, W, H, stops) {
  const grad = g.createLinearGradient(0, 0, 0, H);
  stops.forEach((c, i) => grad.addColorStop(i / (stops.length - 1), c));
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
}
function skyStars(g, W, H, n, maxY, seed = 1) {
  // Deterministic so the sky does not reshuffle on every resize.
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  g.fillStyle = '#fff';
  for (let i = 0; i < n; i++) {
    g.globalAlpha = 0.2 + rnd() * 0.6;
    g.beginPath();
    g.arc(rnd() * W, rnd() * H * maxY, 0.5 + rnd() * 1.2, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
}
function glowCircle(g, x, y, r, color) {
  const grad = g.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, color);
  grad.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
  g.fillStyle = grad;
  g.fillRect(x - r, y - r, r * 2, r * 2);
}
function pine(g, x, base, h, color) {
  g.fillStyle = color;
  for (let i = 0; i < 3; i++) {
    const w = h * (0.42 - i * 0.09), top = base - h + i * h * 0.22, bot = base - h * 0.28 * (2 - i) + h * 0.05;
    g.beginPath();
    g.moveTo(x, top);
    g.lineTo(x - w, bot);
    g.lineTo(x + w, bot);
    g.closePath();
    g.fill();
  }
  g.fillRect(x - h * 0.04, base - h * 0.25, h * 0.08, h * 0.25);
}

const SCENES = {
  forest(g, W, H) {
    gradientSky(g, W, H, ['#06110d', '#0b241c', '#15402d']);
    skyStars(g, W, H, 40, 0.45, 3);
    glowCircle(g, W * 0.78, H * 0.14, 90, 'rgba(230,255,220,0.18)');
    g.fillStyle = '#e9f7e0';
    g.beginPath(); g.arc(W * 0.78, H * 0.14, 22, 0, Math.PI * 2); g.fill();
    for (let x = -20; x < W + 40; x += 46) pine(g, x + (x % 3) * 7, H * 0.86, H * 0.26 + (x % 5) * 8, '#0f3325');
    for (let x = 0; x < W + 40; x += 64) pine(g, x + 20, H + 10, H * 0.24 + (x % 4) * 10, '#07190f');
  },
  rooftops(g, W, H) {
    gradientSky(g, W, H, ['#0a0f1f', '#172241', '#26375e']);
    skyStars(g, W, H, 30, 0.4, 7);
    glowCircle(g, W * 0.24, H * 0.15, 110, 'rgba(253,246,216,0.22)');
    g.fillStyle = '#fdf6d8';
    g.beginPath(); g.arc(W * 0.24, H * 0.15, 28, 0, Math.PI * 2); g.fill();
    let x = -10, i = 0;
    while (x < W + 20) {
      const w = 60 + (i * 37) % 50, h = H * (0.16 + ((i * 53) % 10) / 60), top = H - h;
      g.fillStyle = i % 2 ? '#0d1428' : '#111a33';
      g.fillRect(x, top, w, h);
      g.beginPath(); g.moveTo(x - 6, top); g.lineTo(x + w / 2, top - 26); g.lineTo(x + w + 6, top); g.closePath(); g.fill();
      g.fillRect(x + w * 0.7, top - 34, 10, 22);
      g.fillStyle = 'rgba(255,210,110,0.75)';
      for (let wy = top + 14; wy < H - 20; wy += 28) for (let wx = x + 10; wx < x + w - 14; wx += 20) if ((wx * 7 + wy * 3 + i) % 5 === 0) g.fillRect(wx, wy, 8, 11);
      x += w + 8; i++;
    }
  },
  pond(g, W, H) {
    gradientSky(g, W, H, ['#1a1033', '#4d2452', '#b8564a', '#e98a4f']);
    const hy = H * 0.74;
    glowCircle(g, W / 2, hy, 160, 'rgba(255,190,110,0.45)');
    g.fillStyle = '#ffcf7a';
    g.beginPath(); g.arc(W / 2, hy, 38, Math.PI, 0); g.fill();
    g.fillStyle = '#2a1840';
    g.fillRect(0, hy, W, H - hy);
    g.strokeStyle = 'rgba(255,190,120,0.35)';
    g.lineWidth = 2;
    for (let y = hy + 10, k = 0; y < H; y += 14, k++) { g.beginPath(); g.moveTo(W / 2 - 60 + k * 6, y); g.lineTo(W / 2 + 60 - k * 6, y); g.stroke(); }
    g.fillStyle = '#1f5a3a';
    [[0.18, 0.84], [0.8, 0.9], [0.55, 0.95]].forEach(([px, py]) => { g.beginPath(); g.ellipse(W * px, H * py, 30, 9, 0, 0.3, Math.PI * 2); g.lineTo(W * px, H * py); g.fill(); });
    const reed = (x, h) => {
      g.strokeStyle = '#140b22'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(x, H); g.quadraticCurveTo(x - 6, H - h / 2, x + 4, H - h); g.stroke();
      g.fillStyle = '#140b22'; g.beginPath(); g.ellipse(x + 4, H - h, 4, 12, 0.1, 0, Math.PI * 2); g.fill();
    };
    [8, 22, 34, 46].forEach((x, i) => reed(x, H * (0.22 + i * 0.03)));
    [W - 10, W - 26, W - 40].forEach((x, i) => reed(x, H * (0.2 + i * 0.04)));
  },
  bamboo(g, W, H) {
    gradientSky(g, W, H, ['#0b1a17', '#18352c', '#2f5a47']);
    const ridge = (base, amp, color, seed) => {
      g.fillStyle = color;
      g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W + 20; x += 20) g.lineTo(x, base - Math.abs(Math.sin(x / 90 + seed)) * amp - Math.sin(x / 37 + seed) * amp * 0.2);
      g.lineTo(W, H); g.closePath(); g.fill();
    };
    ridge(H * 0.62, H * 0.18, 'rgba(120,170,145,0.25)', 1);
    ridge(H * 0.76, H * 0.14, 'rgba(60,110,85,0.45)', 3);
    ridge(H * 0.9, H * 0.1, '#10271f', 5);
    const stalk = (x, w) => {
      g.fillStyle = '#1f4a36'; g.fillRect(x, 0, w, H);
      g.fillStyle = '#163a2a';
      for (let y = 30; y < H; y += 70) g.fillRect(x - 1, y, w + 2, 4);
      g.fillStyle = '#2f6b4c';
      for (let y = 60; y < H; y += 140) { g.beginPath(); g.ellipse(x + w + 14, y, 18, 5, -0.5, 0, Math.PI * 2); g.fill(); }
    };
    stalk(6, 12); stalk(28, 9); stalk(W - 18, 12); stalk(W - 36, 8);
  },
  farm(g, W, H) {
    gradientSky(g, W, H, ['#141a3d', '#33417a', '#8a5c8f']);
    skyStars(g, W, H, 25, 0.35, 11);
    const hill = (base, amp, color, phase) => {
      g.fillStyle = color;
      g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W + 20; x += 16) g.lineTo(x, base - Math.sin(x / 140 + phase) * amp);
      g.lineTo(W, H); g.closePath(); g.fill();
    };
    hill(H * 0.74, 26, '#2a4a3a', 0.5);
    g.strokeStyle = '#5a3d2a'; g.lineWidth = 3;
    for (let x = 10; x < W; x += 34) {
      const y = H * 0.74 - Math.sin(x / 140 + 0.5) * 26;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - 18); g.stroke();
    }
    g.beginPath();
    for (let x = 0; x < W; x += 8) { const y = H * 0.74 - Math.sin(x / 140 + 0.5) * 26 - 12; x ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.stroke();
    hill(H * 0.86, 18, '#1c3327', 2);
    for (let x = 16; x < W; x += 30) {
      const y = H * 0.86 - Math.sin(x / 140 + 2) * 18 + 10;
      g.fillStyle = '#ff8c1a'; g.beginPath(); g.moveTo(x - 4, y); g.lineTo(x + 4, y); g.lineTo(x, y + 12); g.closePath(); g.fill();
      g.fillStyle = '#5fbf5f'; g.beginPath(); g.ellipse(x - 3, y - 4, 2, 5, -0.4, 0, Math.PI * 2); g.ellipse(x + 3, y - 4, 2, 5, 0.4, 0, Math.PI * 2); g.fill();
    }
  },
  arctic(g, W, H) {
    gradientSky(g, W, H, ['#030818', '#0a1d3a', '#123a5e']);
    skyStars(g, W, H, 60, 0.6, 5);
    g.lineCap = 'round';
    [['rgba(62,240,160,0.16)', 0], ['rgba(62,200,255,0.12)', 1.5], ['rgba(181,108,255,0.10)', 3]].forEach(([c, ph], i) => {
      g.strokeStyle = c; g.lineWidth = 40 - i * 8;
      g.beginPath();
      for (let x = -20; x <= W + 20; x += 20) { const y = H * (0.16 + i * 0.05) + Math.sin(x / 70 + ph) * 26; x < 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke();
    });
    const berg = (x, w, h, c) => { g.fillStyle = c; g.beginPath(); g.moveTo(x, H); g.lineTo(x + w * 0.2, H - h); g.lineTo(x + w * 0.5, H - h * 1.2); g.lineTo(x + w * 0.8, H - h * 0.8); g.lineTo(x + w, H); g.closePath(); g.fill(); };
    berg(-30, W * 0.6, H * 0.2, '#1d4a72');
    berg(W * 0.45, W * 0.7, H * 0.16, '#2a5f8c');
    berg(W * 0.1, W * 0.5, H * 0.09, '#cfe3f5');
    berg(W * 0.65, W * 0.45, H * 0.07, '#e8f3ff');
  },
};

// ---------- Worlds ----------
const WORLDS = {
  fox: { name: 'Night Forest', scene: 'forest', ambient: 'fireflies', accent: '#b6ff6b', enemies: 'farmers and hunters', humans: ['farmer', 'hunter'], object: 'pinecone', objectColor: '#c08a4a' },
  cat: { name: 'Rainy Rooftops', scene: 'rooftops', ambient: 'rain', accent: '#7fd8ff', enemies: 'vets and splash kids', humans: ['vet', 'splashKid'], object: 'waterDrop', objectColor: '#4fb8f0' },
  frog: { name: 'Sunset Pond', scene: 'pond', ambient: 'pollen', accent: '#ffb86b', enemies: 'bug kids and chefs', humans: ['bugKid', 'chef'], object: 'rock', objectColor: '#9fb8a8' },
  panda: { name: 'Bamboo Mountains', scene: 'bamboo', ambient: 'leaves', accent: '#7fe0a0', enemies: 'builders and lumberjacks', humans: ['builder', 'lumberjack'], object: 'brick', objectColor: '#e0785c' },
  bunny: { name: 'Carrot Farm', scene: 'farm', ambient: 'petals', accent: '#ffb3c8', enemies: 'gardeners and magicians', humans: ['gardener', 'magician'], object: 'flowerPot', objectColor: '#ff7aa2' },
  penguin: { name: 'Arctic Night', scene: 'arctic', ambient: 'snow', accent: '#9fe8ff', enemies: 'fishermen and explorers', humans: ['fisherman', 'explorer'], object: 'snowball', objectColor: '#dfe8f5' },
};
