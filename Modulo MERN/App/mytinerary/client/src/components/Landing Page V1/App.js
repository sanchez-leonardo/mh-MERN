import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import LandingTab from './LandingTab';
import Cities from '../Cities';
import LogIn from '../LogIn';
import SignUp from '../SignUp';
import Footer from '../Footer';

import './styles/Mytinerary-style.css';

class App extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Route exact path='/' component={LandingTab} />
          <Route path='/cities' component={Cities} />
          <Route path='/log-in' component={LogIn} />
          <Route path='/sign-up' component={SignUp} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
