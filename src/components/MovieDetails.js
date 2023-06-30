import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const KEY_E = process.env.REACT_APP_MOVIE_API_KEY;

function SelectedMovie({ selectedId, onCloseMovie }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieRating, setMovieRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genree: genre,
  } = movieDetails;

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
            <StarRating
              maxRating={10}
              color="black"
              onRating={setMovieRating}
            />
            <p>You rate {movieRating} stars at this movie.</p>
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

export default SelectedMovie;
