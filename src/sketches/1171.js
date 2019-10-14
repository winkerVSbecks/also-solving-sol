// const canvasSketch = require('canvas-sketch');
const { lerpArray, linspace } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const polygonClipping = require('polygon-clipping');

const settings = {
  dimensions: [1600, 900],
  scaleToView: true,
  styleCanvas: false,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineJoin = 'round';

    const side = height * 0.4;
    const off = {
      x: (width - 1.5 * side * 2) / 3,
      y: (height - 1.5 * side) / 2,
    };

    const c1 = cube({ side, at: [off.x, height - off.y] });
    renderCube(context)(c1);

    const c2 = cube({
      side: side / 2,
      at: [off.x + side / 2, height - side / 2 - off.y],
      faces: '456',
    });
    renderCube(context)(c2);

    const c3 = cube({ side, at: [width - 1.5 * side - off.x, height - off.y] });
    renderCube(context)(c3);
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

function renderCube(context) {
  return segments => {
    segments.forEach((path, idx) => {
      const [first, ...rest] = path;
      context.beginPath();
      context.strokeStyle = 'black';
      context.moveTo(...first);
      rest.forEach(p => {
        context.lineTo(...p);
      });
      context.closePath();
      context.stroke();
    });
  };
}
