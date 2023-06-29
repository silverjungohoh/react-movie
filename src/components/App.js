import { useEffect, useState } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Main from "./Main";

const KEY_E = process.env.REACT_APP_MOVIE_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);

  const query = "harry";

  const getMovieData = async () => {
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
        <Box>
          <MovieList movies={movies} />
        </Box>
      </Main>
    </div>
  );
}

export default App;
