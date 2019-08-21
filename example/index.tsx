import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Route from './Route'
import update from 'immutability-helper'
// @ts-ignore
window.update = update
ReactDOM.render(
  <Route/>,
  document.getElementById('root') as HTMLElement
);
  
