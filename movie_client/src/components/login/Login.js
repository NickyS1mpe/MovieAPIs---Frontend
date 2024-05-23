import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../loginForm/LoginForm";
import api from "../../api/axiosConfig";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/users/login", {
        username: formData.username,
        password: formData.password,
      });
      console.log(response);
      if (response.data === null) {
        alert("The information you entered doesn't match our records.");
      } else {
        const user = response.data;
        await localforage.setItem("userData", user);
        onLogin(user);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
    // console.log("Form submitted:", formData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Login</h1>
          <LoginForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            formData={formData}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
