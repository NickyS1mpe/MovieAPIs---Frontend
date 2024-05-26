import { useNavigate } from "react-router-dom";
import RegisterForm from "../registerForm/RegisterForm";
import { useState } from "react";
import api from "../../api/axiosConfig";
import localforage from "localforage";
import { Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import "../login/Login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    reEnteredPassword: "",
    emailAddress: "",
    nickname: "",
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

    if (formData.password !== formData.reEnteredPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await api.post("/api/v1/users/register", {
        username: formData.username,
        password: formData.password,
        emailAddress: formData.emailAddress,
        nickname: formData.nickname,
      });
      if (response.status == 200) {
        toast.success("Successfully registered!");

        navigate("/Login");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          toast.error(
            "Username already exists. Please choose a different username."
          );
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        console.error("Error:", err);
        toast.error("Registration failed. Please try again.");
      }
    } // console.log("Form submitted:", formData);
  };

  return (
    <div className="parent-container">
      <div className="blur-background">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h1>Register</h1>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
              <RegisterForm
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
}

export default Register;
