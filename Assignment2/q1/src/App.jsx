
import { useState } from "react";
import "./App.css";

function App() {
  const names = [
    "Rishika", "Rahul", "Priya", "Sneha", "Arjun",
    "Ananya", "Kiran", "Suresh", "Divya", "Vikram"
  ];

  const [search, setSearch] = useState("");

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Live Search Box</h2>

      <input
        type="text"
        placeholder="Search names..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {filteredNames.length === 0 && <p>No names found.</p>}
    </div>
  );
}

export default App;

