import React from 'react';
import canvasSketch from 'canvas-sketch';

export default React.memo(({ sketch, title, instructions }) => {
  const canvasEl = React.useRef(null);

  React.useEffect(() => {
    canvasSketch(
      sketch,
      Object.assign({}, sketch.settings, { canvas: canvasEl.current }),
    );
  }, [canvasEl, sketch]);

  return (
    <div className="measure-wide center">
      <h2 className="gray f6 fw8 mb2 ttu tracked lh-title">
        Wall Drawing #{title}
      </h2>
      <p className="f5 gray mt0 mb4 lh-copy">{instructions}</p>
      <canvas className="db w-100" ref={canvasEl} />
    </div>
  );
});
