import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

// CSS Imports

import '@ajusa/lit/dist/lit.css'
import '@ajusa/lit/dist/util.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './styles/style.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
