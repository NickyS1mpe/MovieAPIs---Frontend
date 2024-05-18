import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Review from "./components/review/Review";
import ErrorPage from "./components/errorPage/ErrorPage";
import Login from "./components/login/Login";
import localforage from "localforage";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    const userData = await localforage.getItem("userData");
    if (userData) {
      setUser(userData);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogOut = () => {
    setUser(null);
  };

  useEffect(() => {
    getMovies();
    getUser();
  }, []);

  return (
    <div className="App">
      <Header hasLogin={user !== null} onLogOut={handleLogOut} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Review
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route
            path="/Login"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route path="*" element=<ErrorPage />></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
