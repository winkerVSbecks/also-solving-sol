import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title, image = 'http://placehold.it/800x600', to }) => (
  <Link className="db black link dim" to={to}>
    <img
      className="db ba b--black-10"
      alt={`Wall drawing number ${title}`}
      src={image}
    />
  </Link>
);
