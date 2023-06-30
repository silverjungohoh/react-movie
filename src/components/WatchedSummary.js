function getAverage(arr) {
  const avg =
    arr.length > 0 && arr
      ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length
      : 0;
  return avg;
}

function WatchedSummary({ watchedMovies }) {
  const avgImdbRating = getAverage(
    watchedMovies.map((movie) => movie.imdbRating)
  );

  const avgUserRating = getAverage(
    watchedMovies.map((movie) => movie.userRating)
  );

  const avgRuntime = getAverage(watchedMovies.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
