import { useNavigate } from "react-router-dom";
import RegisterForm from "../registerForm/RegisterForm";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    try {
      const response = await api.post("/api/v1/users/register", {
        username: formData.username,
        password: formData.password,
        emailAddress: formData.emailAddress,
        nickname: formData.nickname,
      });
      console.log(response);
      if (response.data === null) {
        alert("The information you entered doesn't match our records.");
      } else {
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
          <RegisterForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            formData={formData}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
