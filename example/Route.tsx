import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'
import Test from './Test';
export default () => {
    return <div>
        <Router>
            <Route path="/" component={Test} />
    </Router>
    </div>
  }