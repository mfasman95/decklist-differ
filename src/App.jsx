import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Input, Display } from './Pages';

export default () => (
  <BrowserRouter>
    <div className="App text-center">
      <Route path="/" exact component={Input} />
      <Route path="/display" component={Display} />
    </div>
  </BrowserRouter>
);
