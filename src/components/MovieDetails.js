import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const KEY_E = process.env.REACT_APP_MOVIE_API_KEY;

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watchedMovies,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isWatched = watchedMovies
    .map((watched) => watched.id)
    .includes(selectedId);

  const watchedUserRating = watchedMovies.find(
    (movie) => movie.id === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genree: genre,
  } = movieDetails;

  function handleAddWatched() {
    const newMovie = {
      id: selectedId,
      poster,
      title,
      year,
      userRating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("close movie details with esc");
      }
    }
    document.addEventListener("keydown", callback); // keydown : it occurs when we push keyboard

    return () => {
      document.removeEventListener("keydown", callback);
      console.log("closing");
    };
  }, [onCloseMovie]);

  const getMovieDetails = async () => {
    setIsLoading(true);
    setError("");
    await fetch(`https://www.omdbapi.com/?apikey=${KEY_E}&i=${selectedId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong! You can't get data");
        }
        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          throw new Error("Movie details not found!");
        }
        setMovieDetails(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "UsePopcorn";
      console.log(`Clean up effect for movie ${title}`);
    };
  }, [title]);

  return (
    <div className="datails">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button onClick={() => onCloseMovie()}>&larr;</button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overwiew">
              <h2 className="title">{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {!isWatched ? (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  color="black"
                  onSetUserRating={setUserRating}
                />
                {userRating > 0 && (
                  <button onClick={handleAddWatched}>+ Add to list</button>
                )}
              </div>
            ) : (
              <p>
                You rated <span>⭐️</span> {watchedUserRating} stars at this
                movie.
              </p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default MovieDetails;
