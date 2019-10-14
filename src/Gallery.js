import React from 'react';
import DrawingCard from './DrawingCard';
import drawingConfig from './drawing-config';

export default () => (
  <div>
    <h2 className="dark-gray f5 mb0 ttu tracked">Drawings</h2>
    <div className="bb b--moon-gray bw1 w3 mv4" />
    <div
      style={{
        display: 'grid',
        gridGap: '2rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
        gridAutoFlow: 'dense',
      }}
    >
      {drawingConfig.map(drawing => (
        <DrawingCard
          key={drawing.title}
          title={drawing.title}
          to={drawing.path}
          image={drawing.image}
        />
      ))}
    </div>
  </div>
);
