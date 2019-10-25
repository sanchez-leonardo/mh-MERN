import React, { Component } from 'react';
import ListOfThings from './components/ListOfThings';
import AlternatingDiv from './components/AlternatingDiv';
import Button from './components/Button';

class App extends Component {
  state = {
    phrase: 'A wild list of names appears',
    names: [
      { name: 'Luciano', id: 1 },
      { name: 'Matilda', id: 2 },
      { name: 'Andrea', id: 3 }
    ],
    show: false,
    anotherMessage: 'You clicked to see'
  };

  clickToChange = e => {
    this.setState({ show: !this.state.show });
    e.target.style.backgroundColor = this.state.show ? 'red' : 'transparent';
    console.log(e.target);
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Super Mega App</h1>
        </header>
        <main>
          <h2>React Testing Grounds</h2>
          <div>
            <div>
              <h3>A Phrase and a List</h3>
              <p>{this.state.phrase}</p>
              <ListOfThings names={this.state.names} />
            </div>
            <div>
              <h3>A buton and a container</h3>
              <Button clickFunction={this.clickToChange} />
              <AlternatingDiv
                show={this.state.show}
                message={this.state.anotherMessage}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
