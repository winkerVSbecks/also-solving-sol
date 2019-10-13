import React from 'react';
import DrawingCard from './DrawingCard';
import image from './images/1113.png';

export default () => (
  <div>
    <h2 className="dark-gray f5 mb0">Drawings</h2>
    <div className="bb b--moon-gray bw1 w3 mv4" />
    <div>
      <DrawingCard title="1113" to="/1113" image={image} />
    </div>
  </div>
);
