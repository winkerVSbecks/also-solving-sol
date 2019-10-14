import React from 'react';
import canvasSketch from 'canvas-sketch';
import noise from './images/noise.png';

export default React.memo(
  ({ sketch, title, instructions, noiseTexture = false }) => {
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

        <svg xmlns="http://www.w3.org/2000/svg" className="dn">
          <filter id="noise" x="0" y="0">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="12"
              stitchTiles="stitch"
            />
          </filter>
        </svg>

        <div className="relative overflow-hidden">
          <canvas className="db w-100" ref={canvasEl} />
          <div
            style={{
              display: noiseTexture ? 'block' : 'none',
              // filter: 'url(#noise)',
              backgroundImage: `url(${noise})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '544px 306px',
              // opacity: 0.1,
              // mixBlendMode: 'multiply',
            }}
            className="absolute top-0 left-0 right-0 bottom-0"
          />
        </div>
      </div>
    );
  },
);
