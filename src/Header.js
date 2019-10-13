import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav className="sans-serif pa3 pa4-ns mw8 center">
    <Link className="link dim dark-gray b f2 f1-ns tc db mb3" to="/">
      Also Solving Sol
    </Link>
    <div className="tc">
      <Link className="link dim gray f6 f5-ns dib mr3" to="/">
        Home
      </Link>
      <a
        className="link dim gray f6 f5-ns dib"
        href="http://solvingsol.com/"
        title="Contact"
      >
        Why Also?
      </a>
    </div>
  </nav>
);
