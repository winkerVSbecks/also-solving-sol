import React from 'react';
import canvasSketch from 'canvas-sketch';

export default React.memo(() => {
  const canvasEl = React.useRef(null);

  React.useEffect(
    sketch => {
      canvasSketch(
        sketch,
        Object.assign({}, sketch.settings, { canvas: canvasEl.current }),
      );
    },
    [canvasEl],
  );

  return <canvas ref={canvasEl} />;
});
