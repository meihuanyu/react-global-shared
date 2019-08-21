import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
import Test from './Test';
import Commonly from './Commonly';
import Hooks from './Hooks';
import IFunction from './IFunction';
export default () => {
    return <div>
        <Router>
            <ul>
              <li>
                <Link to="Hooks">Hooks</Link>
              </li>
              <li>
                <Link to="Commonly">Commonly</Link>
              </li>
              <li>
                <Link to="IFunction">IFunction</Link>
              </li>
            </ul>
            <Route exact path="/" render= { x => <span>welcome</span>}/>
            <Route exact path="/Commonly" component={Commonly} />
            <Route exact path="/Hooks" component={Hooks} />
            <Route exact path="/IFunction" component={IFunction} />
        </Router>
    </div>
  }