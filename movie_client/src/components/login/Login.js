import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../loginForm/LoginForm";
import api from "../../api/axiosConfig";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";

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
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        toast.error(`The field "${key}" is required.`);
        return;
      }
    }

    try {
      const response = await api.post("/api/v1/users/login", {
        username: formData.username,
        password: formData.password,
      });
      console.log(response);
      if (response.data === null) {
        toast.error("The information you entered doesn't match our records.");
      } else {
        const user = response.data;
        await localforage.setItem("userData", user);
        onLogin(user);
        toast.success("Successfully login!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
    // console.log("Form submitted:", formData);
  };

  return (
    <div className="parent">
      <div className="blur">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h1>Login</h1>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
              <LoginForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                formData={formData}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
