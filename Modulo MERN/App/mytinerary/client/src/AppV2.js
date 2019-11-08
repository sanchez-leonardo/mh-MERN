import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux'

import store from './store'

import UserMenu from './components/UserMenu';
import Hamburguer from './components/Hamburguer';
import LandingTabV2 from './components/LandingTabV2';
import Cities from './components/Cities';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Footer from './components/Footer';

import './styles/Mytinerary-styleV2.css';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter >
          <div className='app' >
            <div id='menues-div' >
              <UserMenu /> < Hamburguer />
            </div>
            <Route exact path='/' component={LandingTabV2} />
            <Route path='/cities' component={Cities} />
            <Route path='/log-in' component={LogIn} />
            <Route path='/sign-up' component={SignUp} />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;