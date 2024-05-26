import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import toast from "react-hot-toast";

function Header({ hasLogin, onLogOut }) {
  const navigate = useNavigate();

  const login = () => {
    navigate(`/Login`);
  };

  const logOut = async () => {
    await localforage.removeItem("userData");
    onLogOut();
    toast.success("Successfully logged out!");

    navigate(`/Login`);
  };

  const register = () => {
    navigate(`/Register`);
  };

  const profile = () => {
    navigate(`/Profile`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand herf="/" style={{ color: "white" }}>
          <FontAwesomeIcon icon={faVideo} /> Movie APIs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/">
              Watch List
            </NavLink>
          </Nav>
          {!hasLogin ? (
            <div>
              <Button
                variant="outline-info"
                className="me-2"
                onClick={() => login()}
              >
                Login
              </Button>
              <Button
                variant="outline-info"
                className="me-2"
                onClick={() => register()}
              >
                Register
              </Button>
            </div>
          ) : (
            <div>
              <Navbar.Brand herf="/" style={{ color: "white" }}>
                <Button
                  variant="outline-info"
                  className="me-2"
                  onClick={() => profile()}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              </Navbar.Brand>
              <Button
                variant="outline-info"
                className="me-2"
                onClick={() => logOut()}
              >
                Log Out
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
