import { useEffect, useState } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Main from "./Main";

const KEY_E = process.env.REACT_APP_MOVIE_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = "harry";

  const getMovieData = async () => {
    setIsLoading(true);
    const initialData = await fetch(
      `https://www.omdbapi.com/?apikey=${KEY_E}&s=${query}`
    )
      .then((res) => res.json())
      .then((data) => data.Search)
      .catch((err) => console.log(err));

    const movieData = initialData.slice().map((it) => {
      return {
        id: it.imdbID,
        title: it.Title,
        poster: it.Poster,
        year: it.Year,
      };
    });
    setMovies(movieData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div className="App">
      <NavBar>
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>
      </Main>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

export default App;
