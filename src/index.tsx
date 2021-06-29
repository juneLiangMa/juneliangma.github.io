import React from 'react';
import ReactDOM from 'react-dom';

import data from '../posts/1.post.toml'

const App = () => (
  <>
    <div>{data.title}</div>
  </>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
