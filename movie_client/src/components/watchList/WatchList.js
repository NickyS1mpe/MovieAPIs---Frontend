import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import toast from "react-hot-toast";
import api from "../../api/axiosConfig";
import localforage from "localforage";
import "./WatchList.css";

function WatchList({ movies, user }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUserClick = (movie) => {
    setSelectedMovie(movie);
  };

  const watchList = user ? user.watchList : null;

  const filteredMovies = movies?.filter(
    (movie) =>
      watchList?.includes(movie.imdbId) &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeWatchList = async (id) => {
    try {
      const response = await api.post("/api/v1/users/removeWatchList", {
        username: user.username,
        imdbId: id,
      });
      const userData = response.data;
      await localforage.setItem("userData", userData);
      toast.success("successfully remove watch list!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row>
        <Col xs={4}>
          <div className="sidebar">
            <div className="sidebar-header">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <FontAwesomeIcon className="magnify" icon={faMagnifyingGlass} />
            </div>
            <div className="user-list">
              {filteredMovies.map((movie, index) => (
                <div
                  key={index}
                  className={`user-item ${
                    selectedMovie === movie ? "selected" : ""
                  }`}
                  onClick={() => handleUserClick(movie)}
                >
                  {movie.title}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row>
            <Col>
              <div className="main-content" style={{ paddingTop: "15px" }}>
                {selectedMovie ? (
                  <Row>
                    <Col xs={6} md={4}>
                      <Image src={selectedMovie.poster} fluid></Image>
                    </Col>
                    <Col>
                      <h2>{selectedMovie.title}</h2>
                      <p>Release Date: {selectedMovie.releaseDate}</p>
                    </Col>
                  </Row>
                ) : (
                  <p>Please select a movie from the sidebar.</p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col style={{ paddingTop: "15px" }}>
              {selectedMovie ? (
                <Button
                  variant="outline-danger"
                  onClick={() => removeWatchList(selectedMovie.imdbId)}
                >
                  Remove
                </Button>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default WatchList;
