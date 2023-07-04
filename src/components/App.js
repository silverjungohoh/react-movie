import { useEffect, useState } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Main from "./Main";
import Search from "./Search";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";

const KEY_E = process.env.REACT_APP_MOVIE_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watchedMovies, setWatchedMovies] = useState([]);

  const controller = new AbortController();

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? "" : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  function addWatchedMovie(movie) {
    const confirmed = window.confirm("Would you like to add movie?");
    if (confirmed) {
      setWatchedMovies((watchedMovies) => [...watchedMovies, movie]);
      window.alert("Add Success!");
    }
  }

  function deleteWatchedMovie(id) {
    const confirmed = window.confirm("Would you like to delete movie?");
    if (confirmed) {
      setWatchedMovies((watchedMovies) =>
        watchedMovies.filter((movie) => movie.id !== id)
      );
      window.alert("Delete Success!");
    }
  }

  const getMovieData = async () => {
    setIsLoading(true);
    setError("");
    await fetch(`https://www.omdbapi.com/?apikey=${KEY_E}&s=${query}`, {
      signal: controller.signal,
    })
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
        if (err.name !== "AbortError") {
          setError(err.message);
          console.log(err.message);
        }
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

    handleCloseMovie(); // when searching new movie -> close MovieDetails
    getMovieData();

    return () => {
      controller.abort();
    };
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
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={addWatchedMovie}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedMovieList
                watchedMovies={watchedMovies}
                onDeleteWatched={deleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
