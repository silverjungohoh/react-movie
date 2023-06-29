import Movie from "./Movie";

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

export default MovieList;
