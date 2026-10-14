
import { useState } from "react";
import "./App.css";

function App() {
  const names = [
    "Rishika",
    "Priya",
    "Sneha",
    "Arjun",
    "Ananya",
    "Kiran",
    "Suresh",
    "Divya",
    "Vikram",
    "Meera",
    "Nisha",
  ];

  const [search, setSearch] = useState("");

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-page">
      <div className="search-card">
        <h1>Live Search</h1>
        <p className="subtitle">Search names instantly</p>

        <input
          type="text"
          className="search-input"
          placeholder="Type a name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul className="name-list">
          {filteredNames.length > 0 ? (
            filteredNames.map((name, index) => (
              <li key={`${name}-${index}`} className="name-item">
                {name}
              </li>
            ))
          ) : (
            <li className="empty-state">No names found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;

