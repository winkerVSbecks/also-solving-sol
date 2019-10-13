import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title, image, to }) => (
  <Link className="db mw5 black link dim" to={to}>
    <img
      className="db ba b--black-10"
      alt={`Wall drawing number ${title}`}
      src={image}
    />
  </Link>
);
