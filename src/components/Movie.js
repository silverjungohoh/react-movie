function Movie({ movie, onSelectMovie }) {
  return (
    <li
      style={{ cursor: "pointer" }}
      onClick={() => {
        onSelectMovie(movie.id);
      }}
    >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓️</span>
          <span>{movie.year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
