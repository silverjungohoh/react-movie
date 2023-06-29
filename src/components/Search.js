function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    ></input>
  );
}

export default Search;
