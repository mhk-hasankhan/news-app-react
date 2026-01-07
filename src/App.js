import React, { useState, useEffect } from "react";
import "./App.css"; 

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.hits || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [url]);

  const handleChange = (e) => setSearchQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
        searchQuery
      )}`
    );
  };

  const showLoading = () =>
    loading ? <div className="spinner" aria-label="Loading" /> : null;

  const searchForm = () => (
    <form onSubmit={handleSubmit} className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search Hacker News…"
        value={searchQuery}
        onChange={handleChange}
      />
      <button className="search__btn">Search</button>
    </form>
  );

  const showNews = () => (
    <ul className="news-list">
      {news.map((n, i) => (
        <li className="news-card" key={i}>
          <a
            className="news-card__title"
            href={n.url || "#"}
            target="_blank"
            rel="noreferrer"
          >
            {n.title || "Untitled"}
          </a>
          <div className="news-card__meta">
            {n.points ?? 0} points • {n.author ?? "unknown"}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">News</h1>
      </header>

      {searchForm()}
      {showLoading()}
      {showNews()}
    </div>
  );
};

export default App;
