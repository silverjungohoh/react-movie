import WatchedMovie from "./WatchedMovie";

function WatchedMovieList({ watchedMovies }) {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <WatchedMovie movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
