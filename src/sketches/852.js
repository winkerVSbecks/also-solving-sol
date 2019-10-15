const random = require('canvas-sketch-util/random');
const { lerp, linspace } = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const colors = {
  yellow: 'yellow',
  purple: 'purple',
};

const settings = {
  dimensions: [1200, 1200],
  scaleToView: true,
  styleCanvas: false,
  animate: true,
};

const sketch = () => {
  const pane = new Tweakpane({
    title: '852 Params',
  });
  const PARAMS = {
    amplitude: 0.25,
    frequency: 1,
  };
  pane.addInput(PARAMS, 'amplitude', {
    min: 0.05,
    max: 0.5,
  });
  pane.addInput(PARAMS, 'frequency', {
    min: 0.5,
    max: 2,
  });

  return ({ context, width, height, time }) => {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    const wavyLine = noiseLine({
      v: 0.5,
      start: [width, height],
      end: [0, 0],
      amplitude: PARAMS.amplitude * height,
      frequency: PARAMS.frequency,
      time: time * 0.5,
      steps: 150,
    });

    context.fillStyle = colors.purple;
    context.beginPath();
    renderPath(context, wavyLine);
    context.lineTo(width, 0);
    context.closePath();
    context.fill();

    context.fillStyle = colors.yellow;
    context.beginPath();
    renderPath(context, wavyLine);
    context.lineTo(0, height);
    context.closePath();
    context.fill();

    // context.strokeStyle = '#fff';
    // context.lineWidth = width * 0.0075 * 4;
    // context.beginPath();
    // renderPath(context, wavyLine);
    // context.stroke();
  };
};

sketch.settings = settings;
export default sketch;

// canvasSketch(sketch, settings);

/**
 * Draw a wavy line
 */
function noiseLine(opt = {}) {
  const {
    v,
    start,
    end,
    steps = 10,
    frequency = 1,
    time = 0,
    amplitude = 1,
  } = opt;

  const [xStart, yStart] = start;
  const [xEnd, yEnd] = end;
  const angle = Math.atan2(yEnd - yStart, xEnd - xStart);

  // Create a line by walking N steps and interpolating
  // from start to end point at each interval
  const path = linspace(steps).map((_, i) => {
    // Get interpolation factor between 0..1
    const t = i / (steps - 1);

    // Interpolate X position
    let x = lerp(xStart, xEnd, t);
    // Interpolate Y position
    let y = lerp(yStart, yEnd, t);

    // Offset X Y position by noise
    // Orthogonal to the direction of the line
    const amp = Math.sin(lerp(0, Math.PI, t)) * amplitude;
    const diff =
      random.noise3D(t * frequency + time, v * frequency, time) * amp;

    y += diff * Math.sin(angle);
    x -= diff * Math.cos(angle);

    return [x, y];
  });

  return path;
}

function renderPath(context, path) {
  const [first, ...rest] = path;
  context.lineJoin = 'round';
  context.moveTo(...first);
  rest.forEach(p => {
    context.lineTo(...p);
  });
}
