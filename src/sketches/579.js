const colors = {
  yellow: '#F4D02D',
  pink: '#D13F6A',
  blue: '#32A5CD',
};

const settings = {
  dimensions: [1200, 1200],
  scaleToView: true,
  styleCanvas: false,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
    const renderArch = arch(context);

    const archWidth = width / 8;

    renderArch({
      x: width / 2,
      y: 2.5 * archWidth,
      width: 5 * archWidth,
      height,
      color: colors.blue,
    });

    renderArch({
      x: width / 2,
      y: 2.5 * archWidth,
      width: 3 * archWidth,
      height,
      color: colors.pink,
    });

    renderArch({
      x: width / 2,
      y: 2.5 * archWidth,
      width: archWidth,
      height,
      color: colors.yellow,
    });
  };
};

sketch.settings = settings;
export default sketch;

// canvasSketch(sketch, settings);

/**
 * Arch
 */
function arch(context) {
  return ({ x, y, width: w, height: h, color }) => {
    const r = w / 2;

    context.fillStyle = color;
    context.beginPath();

    // (x, y, radius, startAngle, endAngle [, anticlockwise]);
    context.arc(x, y, r, Math.PI, 0);
    context.rect(x - r, y, w, h - y);
    context.fill();
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
