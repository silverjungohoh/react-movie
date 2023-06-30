import { useEffect, useState } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Main from "./Main";
import Search from "./Search";
import Loader from "./Loader";

const KEY_E = process.env.REACT_APP_MOVIE_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const getMovieData = async () => {
    setIsLoading(true);
    setError("");
    await fetch(`https://www.omdbapi.com/?apikey=${KEY_E}&s=${query}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong! You can't get data");
        }
        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          throw new Error("Movies not found!");
        }
        setMovies(
          data.Search.slice().map((it) => {
            return {
              id: it.imdbID,
              title: it.Title,
              poster: it.Poster,
              year: it.Year,
            };
          })
        );
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    getMovieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="App">
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
      </Main>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🚫</span> {message}
    </p>
  );
}

export default App;
