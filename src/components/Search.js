import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      className="search"
      placeholder="search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    ></input>
  );
}

export default Search;
