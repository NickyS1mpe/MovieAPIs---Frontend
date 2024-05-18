import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

function Header({ hasLogin, onLogOut }) {
  const navigate = useNavigate();

  const login = () => {
    navigate(`/Login`);
  };

  const logOut = async () => {
    await localforage.removeItem("userData");
    onLogOut();
    navigate(`/Login`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand herf="/" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faVideoSlash} />
          Gold
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
              <Button variant="outline-info" className="me-2">
                Register
              </Button>
            </div>
          ) : (
            <Button
              variant="outline-info"
              className="me-2"
              onClick={() => logOut()}
            >
              Log Out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
