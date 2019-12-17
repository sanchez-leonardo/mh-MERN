import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logInUser } from "../actions/usersActions";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userPassword: "",
        userEmail: ""
      },
      required: {
        userPassword: "",
        userEmail: ""
      }
    };
  }

  handleInputValue(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });
  }

  requiredField(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    const { required } = this.state;

    if (name === "userEmail") {
      required[name] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "complete"
        : "empty";
    } else {
      if (value.length < 6) {
        required[name] = "empty";
      } else {
        required[name] = "complete";
      }
    }

    this.setState({ required });
  }

  submitForm(evt) {
    evt.preventDefault();

    this.props.logInUser(this.state.formData);

    this.setState({
      formData: {
        ...this.state.formData,
        userName: "",
        userPassword: ""
      }
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <Container>
        <h1 className="text-center">Log In</h1>
        <Form onSubmit={e => this.submitForm(e)}>
          <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="example@something.com"
              onChange={e => {
                this.handleInputValue(e);
                this.requiredField(e);
              }}
              valid={this.state.required.userEmail === "complete"}
              invalid={this.state.required.userEmail === "empty"}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">Password</Label>
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
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary" size="lg">
              Log In!
            </Button>
          </FormGroup>
        </Form>
        <Row className="mt-5">
          <Col xs="12">
            <a
              href="http://localhost:3030/api/users/login/google"
              className="text-center"
            >
              Google fo' sho'
            </a>
          </Col>
          <Col xs="12">
            <p className="text-center">Facebook maybe</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs="12">
            <p className="text-center">
              Don't have an account? Join the community!
            </p>
          </Col>
          <Col xs="12" className="text-center">
            <NavLink to="/sign-up">Sign Up!</NavLink>
          </Col>
        </Row>
      </Container>
    );
  }
}

LogIn.propTypes = {
  logInUser: PropTypes.func.isRequired,
  loggedUser: PropTypes.bool
};

const mapStateToProps = state => ({
  loggedUser: state.user.logged
});

export default connect(mapStateToProps, { logInUser })(LogIn);
