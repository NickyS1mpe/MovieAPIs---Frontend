import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import api from "../../api/axiosConfig";
import toast from "react-hot-toast";
import localforage from "localforage";

const Hero = ({ movies, user }) => {
  const navigate = useNavigate();
  const watchList = user ? user.watchList : null;

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  const addWatchList = async (id) => {
    if (!user) {
      toast.error("please login first to edit watch list");
      return;
    }
    try {
      const response = await api.post("/api/v1/users/addWatchList", {
        username: user.username,
        imdbId: id,
      });

      const userData = response.data;
      await localforage.setItem("userData", userData);
      toast.success("successfully add watch list!");
    } catch (err) {
      console.log(err);
    }
  };

  const removeWatchList = async (id) => {
    if (!user) {
      toast.error("please login first to edit watch list");
      return;
    }
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
    <div>
      {movies != null && movies.length > 0 ? (
        <div className="movie-carousel-container">
          <Carousel>
            {movies?.map((movie) => {
              return (
                <Paper key={movie.imdbId}>
                  <div className="movie-card-container">
                    <div
                      className="movie-card"
                      style={{ "--img": `url(${movie.backdrops[0]})` }}
                    >
                      <div className="movie-detail">
                        <div className="movie-poster">
                          <img src={movie.poster} alt="" />
                        </div>
                        <div className="movie-title">
                          <h4>{movie.title}</h4>
                        </div>
                        <div className="movie-buttons-container">
                          <Link
                            to={`/Trailer/${movie.trailerLink.substring(
                              movie.trailerLink.length - 11
                            )}`}
                          >
                            <div className="play-button-icon-container">
                              <FontAwesomeIcon
                                className="play-button-icon"
                                icon={faCirclePlay}
                              />
                            </div>
                          </Link>

                          <div className="movie-review-button-container">
                            <Button
                              variant="info"
                              onClick={() => reviews(movie.imdbId)}
                            >
                              Reviews
                            </Button>
                          </div>

                          <div
                            className="star-icon-container"
                            onClick={() =>
                              watchList && watchList.includes(movie.imdbId)
                                ? removeWatchList(movie.imdbId)
                                : addWatchList(movie.imdbId)
                            }
                          >
                            <FontAwesomeIcon
                              className="star-icon"
                              icon={faStar}
                              style={{
                                color:
                                  watchList && watchList.includes(movie.imdbId)
                                    ? "rgb(255, 183, 0)"
                                    : "rgb(255, 255, 255)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              );
            })}
          </Carousel>
        </div>
      ) : null}
    </div>
  );
};

export default Hero;
