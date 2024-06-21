import Hero from "../hero/Hero";

const Home = ({ movies, user }) => {
  return <Hero movies={movies} user={user} />;
};

export default Home;
