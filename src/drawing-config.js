import React from 'react';
import Drawing from './Drawing';
import sketch1113 from './sketches/1113';

export default [
  {
    path: '/1113',
    component: () => (
      <Drawing
        sketch={sketch1113}
        title="1113"
        instructions="On a wall, a triangle within a rectangle, each with broken bands of color."
      />
    ),
  },
];
