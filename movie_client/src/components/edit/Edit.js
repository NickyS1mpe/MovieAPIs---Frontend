import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axiosConfig";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";
import "./Edit.css";

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state;

  const [formData, setFormData] = useState(userData);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/users/update", {
        username: formData.username,
        twitter: formData.twitter,
        notes: formData.notes,
        nickname: formData.nickname,
        avatar: formData.avatar,
      });
      console.log(response);
      if (response.data === null) {
        alert("The information you entered doesn't match our records.");
      } else {
        const user = response.data;
        await localforage.setItem("userData", user);
        navigate("/Profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="parent">
      <div className="blur">
        <div id="contact-form">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="nickname">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nickname"
                name="nickname"
                defaultValue={formData?.nickname}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="twitter" style={{ marginTop: "2vh" }}>
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="text"
                placeholder="@jack"
                name="twitter"
                defaultValue={formData?.twitter}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="avatar" style={{ marginTop: "2vh" }}>
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/avatar.jpg"
                style={{ width: "50vh" }}
                name="avatar"
                defaultValue={formData?.avatar}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="notes" style={{ marginTop: "2vh" }}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="notes"
                defaultValue={formData?.notes}
                onChange={onChange}
              />
            </Form.Group>

            <div className="button-container" style={{ marginTop: "3vh" }}>
              <Button
                variant="light"
                type="submit"
                style={{ marginRight: "5vh" }}
              >
                Save
              </Button>
              <Button variant="light" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
