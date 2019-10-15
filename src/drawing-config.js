import React from 'react';
import Drawing from './Drawing';
import sketch1113 from './sketches/1113';
import image1113 from './images/1113.png';
import sketch1171 from './sketches/1171';
import image1171 from './images/1171.png';
import sketch579 from './sketches/579';
import image579 from './images/579.png';
import sketch852 from './sketches/852';
// import image852 from './images/852.png';

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
    image: image1171,
    component: () => (
      <Drawing
        sketch={sketch1171}
        title="1171"
        instructions="Five degrees of scribbles: A cube without a cube; A cube without a corner."
        noiseTexture
      />
    ),
  },
  {
    title: '579',
    path: '/579',
    image: image579,
    component: () => (
      <Drawing
        sketch={sketch579}
        title="579"
        instructions="Three concentric arches. The outside one is blue; the middle red; and the inside one is yellow."
        noiseTexture
      />
    ),
  },
  {
    title: '852',
    path: '/852',
    // image: image852,
    component: () => (
      <Drawing
        sketch={sketch852}
        title="852"
        instructions="A wall divided from the upper left to the lower right by a curvy line; left: glossy yellow; right: glossy purple."
      />
    ),
  },
];
