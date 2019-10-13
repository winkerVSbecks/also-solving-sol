import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Gallery from './Gallery';
import Header from './Header';
import Footer from './Footer';
import drawingConfig from './drawing-config';

export default () => (
  <Router>
    <Header />
    <main className="sans-serif mw8 center ph3 ph4-ns mv4 mv5-ns">
      <Switch>
        <Route exact path="/">
          <Gallery />
        </Route>
        {drawingConfig.map(routeConfig => (
          <Route {...routeConfig} />
        ))}
      </Switch>
    </main>

    <Footer />
  </Router>
);
