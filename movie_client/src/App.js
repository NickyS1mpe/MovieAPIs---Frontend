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
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import WatchList from "./components/watchList/WatchList";
import Edit from "./components/edit/Edit";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import { Toaster } from "react-hot-toast";

// import Footer from "./components/footer/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

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
    console.log(user);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <div className="App">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>

      <Header hasLogin={user !== null} onLogOut={handleLogOut} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Home movies={movies} user={user} />}
          ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Review
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
                user={user}
              />
            }
          ></Route>
          <Route element={<ProtectedRoutes auth={!user} />}>
            <Route
              path="/Login"
              element={<Login onLogin={handleLogin} />}
            ></Route>
            <Route path="/Register" element={<Register />}></Route>
          </Route>
          <Route element={<ProtectedRoutes auth={!!user} />}>
            <Route
              path="/Profile"
              element={<Profile userData={user} />}
            ></Route>
            <Route path="/Profile/Edit" element={<Edit />}></Route>
          </Route>
          <Route
            path="/WatchList"
            element={<WatchList movies={movies} user={user} />}
          ></Route>
          <Route path="*" element=<ErrorPage />></Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
