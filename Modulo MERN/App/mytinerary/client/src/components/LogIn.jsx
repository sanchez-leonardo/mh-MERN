import React, { Component } from "react";

import { NavLink } from "react-router-dom";

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
  render() {
    return (
      <Container>
        <h1 className="text-center">Log In</h1>
        <Form>
          <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="example@something.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">Password</Label>
            <Input
              type="password"
              name="userPassword"
              id="userPassword"
              placeholder="6 digits or more"
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
            <a href="http://localhost:3030/api/users/login/google" className="text-center">Google fo' sho'</a>
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

export default LogIn;
