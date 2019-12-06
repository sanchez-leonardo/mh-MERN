import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { signUpUser } from "../actions/usersActions";

import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input
} from "reactstrap";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userName: "",
        userPassword: "",
        userEmail: "",
        userFirstName: "",
        userLastName: "",
        userCountry: ""
      },
      required: {
        userName: "",
        userPassword: "",
        userEmail: ""
      },
      tosCheck: false
    };
  }

  handleInputValue(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    if (target.type === "checkbox") {
      this.setState({ [name]: value })
    } else {

      this.setState({
        formData: {
          ...this.state.formData,
          [name]: value
        }
      });
    }
  }

  requiredField(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    const { required } = this.state

    if (name === "userEmail") {

      required[name] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "complete" : "empty"

    } else {

      if (value.length < 6) {
        required[name] = "empty"
      } else {
        required[name] = "complete"
      }

    }

    this.setState({ required })
  }

  submitForm(evt) {
    evt.preventDefault()

    this.props.signUpUser(this.state.formData)
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
                type="text"
                name="userName"
                id="userName"
                placeholder="6 digits or more"
                onChange={e => {
                  this.handleInputValue(e);
                  this.requiredField(e);
                }}
                valid={this.state.required.userName === "complete"}
                invalid={this.state.required.userName === "empty"}
              />
              <FormFeedback invalid>This field is required</FormFeedback>
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
                  this.requiredField(e);
                }}
                valid={this.state.required.userPassword === "complete"}
                invalid={this.state.required.userPassword === "empty"}
              />
              <FormFeedback invalid>This field is required</FormFeedback>
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
                  this.requiredField(e);
                }}
                valid={this.state.required.userEmail === "complete"}
                invalid={this.state.required.userEmail === "empty"}
              />
              <FormFeedback invalid>This field is required</FormFeedback>
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
            <Button color="primary" size="md" disabled={!this.state.tosCheck}>
              Sign Up!
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { signUpUser })(SignUp);
