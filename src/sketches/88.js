const rough = require('roughjs/dist/rough.umd');
const random = require('canvas-sketch-util/random');
const { lerp, linspace } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1200, 900],
  scaleToView: true,
  styleCanvas: false,
};

let roughCanvas;

// A 6-inch (15 cm) grid covering the wall. Within each square, not straight lines in either of four directions.
// Only one direction in each square but as many as desired, and at least one line in each square.
const sketch = ({ canvas }) => {
  roughCanvas = rough.canvas(canvas);

  return ({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const tileSize = 60; // 1 in. = 10 px
    const gridSize = [width / tileSize, height / tileSize];

    for (let x = 0; x < gridSize[0]; x++) {
      for (let y = 0; y < gridSize[1]; y++) {
        const tx = tileSize * x;
        const ty = tileSize * y;
        const amplitude = random.range(0.05, 0.5) * tileSize;
        const direction = random.pick([
          'horizontal',
          'vertical',
          'diagonalLtoR',
          'diagonalRtoL',
        ]);

        renderGrid({ context, gridSize, tileSize, width, height });

        const notStraightLines = linspace(6).map(i => {
          const amp = amplitude * random.range(0.5, 1.25);
          const { start, end } = lineCoords({
            x: tx,
            y: ty,
            size: tileSize,
            padding: amp / 2,
            step: i,
            direction,
          });

          const notStraightLine = noiseLine({
            v: 0.5,
            start,
            end,
            amplitude: amp,
            frequency: random.range(0.5, 2),
            time: time * 0.5,
            steps: 150,
            direction,
          });

          return notStraightLine;
        });

        renderLines({
          context,
          paths: notStraightLines,
          clip: [tx, ty, tileSize, tileSize],
        });
      }
    }
  };
};

sketch.settings = settings;
export default sketch;

// canvasSketch(sketch, settings);

/**
 * Draw a wavy line
 * based on https://glitch.com/edit/#!/p5-example-noise-lines
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

    y += diff * Math.cos(angle);
    x -= diff * Math.sin(angle);

    return [x, y];
  });

  return path;
}

function lineCoords({ x, y, size, padding, step, direction = 'horizontal' }) {
  if (direction === 'horizontal') {
    return {
      start: [x, lerp(y, y + size, step)],
      end: [x + size, lerp(y, y + size, step)],
    };
  } else if (direction === 'vertical') {
    return {
      start: [lerp(x, x + size, step), y],
      end: [lerp(x, x + size, step), y + size],
    };
  } else if (direction === 'diagonalLtoR') {
    return {
      start: [lerp(x - size / 2, x + size / 2, step), y],
      end: [lerp(x + size / 2, x + 1.5 * size, step), y + size],
    };
  } else if (direction === 'diagonalRtoL') {
    return {
      start: [x, lerp(y + 1.5 * size, y + size / 2, step)],
      end: [x + size, lerp(y + size / 2, y - size / 2, step)],
    };
  }
}

function renderGrid({ context, gridSize, tileSize, width, height }) {
  context.strokeStyle = '#eee';
  for (let x = 1; x < gridSize[0]; x++) {
    context.beginPath();
    context.moveTo(x * tileSize, 0);
    context.lineTo(x * tileSize, height);
    context.stroke();
  }
  for (let y = 1; y < gridSize[1]; y++) {
    context.beginPath();
    context.moveTo(0, y * tileSize);
    context.lineTo(width, y * tileSize);
    context.stroke();
  }
}

function renderLines({ context, paths, color, clip }) {
  context.save();
  context.rect(...clip);
  context.clip();
  paths.forEach(path => {
    renderLine({ context, path, color });
  });
  context.restore();
}

function renderLine({ context, path }) {
  const color = random.pick([
    // '#333333',
    // '#555555',
    '#777777',
    '#999999',
    '#AAAAAA',
  ]);
  // roughCanvas.linearPath(path, {
  //   stroke: color,
  //   roughness: 2.8,
  //   strokeWidth: 2,
  // });
  const [first, ...rest] = path;
  context.lineJoin = 'round';
  // context.lineWidth = 2;
  context.strokeStyle = color;

  context.beginPath();
  context.moveTo(...first);
  rest.forEach(p => {
    context.lineTo(...p);
  });

  context.stroke();
}
