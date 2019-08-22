import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Index from './components/layout/Index';

import Lyrics from './components/tracks/Lyrics';

//import provider from context.js
import { Provider } from './context';
/*
wrap every output inside provider to access the state

*/
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
      <Router>
        <React.Fragment>
          <Navbar />
             <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
           <Footer /> 
        </React.Fragment>
      </Router>
      </Provider> 
    );
  }
}

export default App;
