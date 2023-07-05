import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) {
        return;
      }
      if (e.code === "Enter") {
        console.log(inputEl.current);
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
      console.log("closing");
    };
  }, []);

  return (
    <input
      type="text"
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    ></input>
  );
}

export default Search;
