import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';


class Cities extends Component {
  constructor() {
    super();
    this.state = { cities: [] }
  }

  fetchCities = () => {
    fetch('/cities').then(response => response.json()).then(cities => this.setState({ cities })).catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchCities()
  }

  render() {
    return (
      <section className='tab cities'>
        <Container>
          <h1>Cities</h1>

          <ListGroup>
            {this.state.cities.map(city => {
              return (<ListGroupItem key={city._id}>
                {city.city}, {city.country}
              </ListGroupItem>)
            })}
          </ListGroup>

        </Container>
      </section>
    );
  };
}

export default Cities;
