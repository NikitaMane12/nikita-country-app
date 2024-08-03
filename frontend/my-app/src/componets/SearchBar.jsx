import React, { useState, useRef } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/countries/${query}`);
      setCountries(res.data);

      await axios.post("/api/history", { currencyCode: query });
      const historyRes = await axios.get("/api/history");
      setHistory(historyRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by currency code..."
          value={query}
          onChange={handleChange}
          ref={inputRef}
        />
        <button type="submit" style={{ background: "palevioletred" }}>
          Search
        </button>
      </form>
      <div>
        <h3>Search Results:</h3>
        <ul>
          {countries.map((country, index) => (
            <li key={index}>{country.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Search History:</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item.currencyCode}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
