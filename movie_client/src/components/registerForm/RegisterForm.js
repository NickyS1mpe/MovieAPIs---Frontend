import { Form, Button } from "react-bootstrap";

const LoginForm = ({ onSubmit, onChange, formData }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formReenterPassword">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-enter password"
          name="reEnteredPassword"
          value={formData.reEnteredPassword}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email address"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNickname">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter nickname"
          name="nickname"
          value={formData.nickname}
          onChange={onChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
