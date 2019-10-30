import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import UserMenu from './UserMenu';
import Hamburguer from './Hamburguer';
import LandingTabV2 from './LandingTabV2';
import Cities from '../Cities';
import LogIn from '../LogIn';
import SignUp from '../SignUp';
import Footer from '../Footer';

import '../../styles/Mytinerary-styleV2.css';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <div id='menues-div'>
            <UserMenu /> <Hamburguer />
          </div>
          <Route exact path='/' component={LandingTabV2} />
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
