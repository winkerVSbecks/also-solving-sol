const Tweakpane = require('tweakpane');
const { lerpArray } = require('canvas-sketch-util/math');

const grays = [
  '#333333', // 0
  '#555555', // 1
  '#777777', // 2
  '#999999', // 3
  '#AAAAAA', // 4
  '#CCCCCC', // 5
  '#EEEEEE', // 6
  '#F4F4F4', // 7
];

const settings = {
  dimensions: [1600, 900],
  scaleToView: true,
  styleCanvas: false,
  animate: true,
};

const sketch = () => {
  const pane = new Tweakpane({
    title: '1171 Params',
  });
  const PARAMS = {
    'Cube Size': 0.5,
    'Missing Cube Size': 0.5,
    'Corner Size': 0.5,
  };

  pane.addInput(PARAMS, 'Cube Size', {
    min: 0,
    max: 1,
  });
  pane.addInput(PARAMS, 'Missing Cube Size', {
    min: 0,
    max: 1,
  });
  pane.addInput(PARAMS, 'Corner Size', {
    min: 0,
    max: 1,
  });

  return ({ context, width, height }) => {
    context.fillStyle = grays[6];
    context.fillRect(0, 0, width, height);
    context.lineJoin = 'round';

    const side = height * PARAMS['Cube Size'];

    const off = {
      x: (width - 1.5 * side * 2) / 3,
      y: (height - 1.5 * side) / 2,
    };

    const cube1 = cube({ side, at: [off.x, height - off.y] });
    renderCube(context)(cube1, [grays[5], grays[4], grays[3]]);

    const missingSide = PARAMS['Missing Cube Size'] * side;
    const missingCube = cube({
      side: missingSide,
      at: [off.x + side - missingSide, height - (side - missingSide) - off.y],
      faces: '456',
    });
    renderCube(context)(missingCube, [grays[3], grays[5], grays[4]]);

    const cube2 = cube({
      side,
      at: [width - 1.5 * side - off.x, height - off.y],
    });
    renderCube(context)(cube2, [grays[5], grays[4], grays[3]]);

    const cube2Corner = corner({
      side,
      t: PARAMS['Corner Size'],
      at: [width - 1.5 * side - off.x, height - off.y],
    });
    renderPath(context, cube2Corner, grays[2]);
  };
};

sketch.settings = settings;
export default sketch;

// canvasSketch(sketch, settings);

/**
 * 3D cube to 2D paths using cabinet projection
 *           (x + r * Math.sin(45), y - r * Math.cos(45))
 *              where r = side * Math.cos(45)
 *         = (x + side / 2, y - side / 2)
 *          /
 *        /
 *      /
 *    /
 *  (x,y)
 */
function cube({ side: s, faces = '123', at: [x, y] }) {
  const o = s / 2;

  const paths =
    faces === '123'
      ? [
          // 1
          [[0, 0], [s, 0], [s, -s], [0, -s]],
          // 2
          [[0, -s], [o, -s - o], [o + s, -s - o], [s, -s]],
          // 3
          [[s, -s], [o + s, -s - o], [o + s, -o], [s, 0]],
        ]
      : [
          // 4
          [[0, 0], [0, -s], [o, -s - o], [o, -o]],
          // 5
          [[o, -s - o], [o + s, -s - o], [o + s, -o], [o, -o]],
          // 6
          [[0, 0], [o, -o], [o + s, -o], [0 + s, 0]],
        ];

  return paths.map(p => p.map(([x1, y1]) => [x1 + x, y1 + y]));
}

function corner({ side: s, t = 0.5, at: [x, y] }) {
  const o = s / 2;

  const path = [
    lerpArray([s, -s], [0, -s], t),
    lerpArray([s, -s], [s + o, -s - o], t),
    lerpArray([s, -s], [s, 0], t),
  ];

  return path.map(([x1, y1]) => [x1 + x, y1 + y]);
}

function renderCube(context) {
  return (segments, colors) => {
    segments.forEach((path, idx) => {
      renderPath(context, path, colors[idx]);
    });
  };
}

function renderPath(context, path, color) {
  const [first, ...rest] = path;
  context.beginPath();
  context.fillStyle = color;
  context.moveTo(...first);
  rest.forEach(p => {
    context.lineTo(...p);
  });
  context.closePath();
  context.fill();
}
