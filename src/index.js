import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root')); 
//renders the App component from App.js in index.html div with id="root"

serviceWorker.unregister();

//5deff020c4cc1fb3e138df5b84eae06d   MUSIXMATCH API KEY