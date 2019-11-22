import React, { Component } from "react";

import { Form, FormGroup, Label, Input } from "reactstrap";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
  }

  handleOnChange = e => {
    this.setState({ searchString: e.target.value });
    this.props.filterCities(e.target.value);
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label htmlFor="filterValue">Search by city...</Label>
          <Input id="filterValue" onChange={this.handleOnChange}></Input>
        </FormGroup>
      </Form>
    );
  }
}

export default FilterForm;
