/** @jsx React.createElement */

import React from './React/index.js';

const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">Answer React</h2>
  </div>
);

const container = document.getElementById("root");
React.render(element, container);
