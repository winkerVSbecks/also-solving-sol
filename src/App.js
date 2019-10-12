import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Gallery from './Gallery';

export default () => (
  <Router>
    <nav className="sans-serif pa3 pa4-ns mw8 center">
      <Link
        className="link dim black b f2 f1-m f-headline-l tc db mb3 mb4-ns"
        to="/"
      >
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
    <main className="sans-serif mw8 center ph3 ph4-ns mv3 mv4-ns">
      <Switch>
        <Route exact path="/">
          <Gallery />
        </Route>
      </Switch>
    </main>
  </Router>
);
