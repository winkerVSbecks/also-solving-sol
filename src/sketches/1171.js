/**
 *            r = side * Math.cos(45)
 *           (x + r * Math.sin(45), y + r * Math.cos(45))
 *         = (x + side / 2, y + side / 2)
 *          /
 *        /
 *      /
 *    /
 *  (x,y)
 */
// const canvasSketch = require('canvas-sketch');
const { lerpArray, linspace } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const polygonClipping = require('polygon-clipping');

const settings = {
  dimensions: [800, 600],
  scaleToView: true,
  styleCanvas: false,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    const w = width;
    const h = height;
    const s = w / 4;
    const o = s / 2;

    // prettier-ignore
    const cube = [
      [[0, h], [s, h], [s, h - s], [0, h - s]],
      [
        [0, h - s],
        [0 + o, h - s - o],
        [0 + o + s, h - s - o],
        [s, h - s]
      ],
      [
        [s, h - s],
        [0 + o + s, h - s - o],
        [0 + o + s, h - o],
        [s, h]
      ]
    ];

    renderCube(context)(cube);
  };
};

sketch.settings = settings;
export default sketch;

// canvasSketch(sketch, settings);

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
