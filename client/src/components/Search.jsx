import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (query.length < 3) {
      return setError("Enter at least 3 character");
    }
    const urlP = new URLSearchParams(location.search);
    urlP.set("query", query);
    const searchQuery = urlP.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
      {/* <form
        onSubmit={handleSubmit}
        className="mt-3 flex justify-start pb-12 mb-12 border-b-2 border-green-200"
      >
        <label className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" mr-1 py-[3px] rounded-sm px-2 w-full border-y-2 border-l-2 "
            type="search"
            placeholder="Search blog posts"
          />
        </label>
        <label htmlFor="search">
          <button type="submit">
            <CiSearch className="inline-block text-[35px]  hover:text-green-600" />
          </button>
        </label>
      </form>
      {error && (
        <p className="relative bottom-24 text-red-500 text-sm text-center">
          {error}
        </p>
      )} */}
    </>
  );
}

export default Search;
