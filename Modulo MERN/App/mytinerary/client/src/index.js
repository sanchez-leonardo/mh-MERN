import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Versión 1
// import App from './App';

import AppV2 from './AppV2';

import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(< AppV2 />, document.getElementById('root'));

serviceWorker.unregister();