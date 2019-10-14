import React from 'react';
import Drawing from './Drawing';
import sketch1113 from './sketches/1113';
import image1113 from './images/1113.png';
import sketch1171 from './sketches/1171';

export default [
  {
    title: '1113',
    path: '/1113',
    image: image1113,
    component: () => (
      <Drawing
        sketch={sketch1113}
        title="1113"
        instructions="On a wall, a triangle within a rectangle, each with broken bands of color."
      />
    ),
  },
  {
    title: '1171',
    path: '/1171',
    component: () => (
      <Drawing
        sketch={sketch1171}
        title="1171"
        instructions="Five degrees of scribbles: A cube without a cube; A cube without a corner."
      />
    ),
  },
];
