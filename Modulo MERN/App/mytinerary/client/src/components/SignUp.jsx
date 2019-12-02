import React, { Component } from "react";

// import { Link } from "react-router-dom";

import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPassword: "",
      userEmail: "",
      userFirstName: "",
      userLastName: "",
      userCountry: "",
      tosCheck: false
    };
  }

  handleInputValue(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  }

  async submitForm(evt) {
    evt.preventDefault();
    console.log(this.state);

    let formData = {
      userName: this.state.userName,
      userPassword: this.state.userPassword,
      userEmail: this.state.userEmail,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
      userCountry: this.state.userCountry
    };

    let body = new URLSearchParams(formData);

    let init = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    };

    await fetch("/users", init);
  }

  render() {
    return (
      <Container>
        <h2 className="text-center">Create Account</h2>
        <Form onSubmit={e => this.submitForm(e)}>
          <FormGroup row>
            <Label for="userName">User Name:</Label>
            <Col>
              <Input
                type="email"
                name="userName"
                id="userName"
                placeholder="6 digits or more"
                onChange={e => {
                  this.handleInputValue(e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="userPassword">Password:</Label>
            <Col>
              <Input
                type="password"
                name="userPassword"
                id="userPassword"
                placeholder="6 digits or more"
                onChange={e => {
                  this.handleInputValue(e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="userEmail">Email:</Label>
            <Col>
              <Input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="example@somewhere.com"
                onChange={e => {
                  this.handleInputValue(e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="userFirstName">First Name:</Label>
            <Col>
              <Input
                type="text"
                name="userFirstName"
                id="userFirstName"
                placeholder="Your Name"
                onChange={e => {
                  this.handleInputValue(e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="userLastName">Last Name:</Label>
            <Col>
              <Input
                type="text"
                name="userLastName"
                id="userLastName"
                placeholder="6 digits or more"
                onChange={e => {
                  this.handleInputValue(e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="userCountry">Contry: </Label>
            <Col>
              <Input
                type="select"
                name="userCountry"
                id="userCountry"
                defaultValue="Select a country"
                onChange={e => {
                  this.handleInputValue(e);
                }}
              >
                <option disabled={true}>Select a country</option>
                <option>England</option>
                <option>France</option>
                <option>Germany</option>
                <option>Holland</option>
                <option>Spain</option>
                <option>United States of America</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row className="text-center">
            <Col sm="10">
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="tosCheck"
                    name="tosCheck"
                    onChange={e => {
                      this.handleInputValue(e);
                    }}
                  />
                  I have read the{" "}
                  <span className="text-primary">
                    <u>Terms of Service</u>
                  </span>
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary" size="md">
              Sign Up!
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default SignUp;
