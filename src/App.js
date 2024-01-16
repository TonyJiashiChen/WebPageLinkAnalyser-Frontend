import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAnalyzeClick = async () => {
    console.log("are you even trying?");
    setLinks([]);
    try {
      const response = await axios.post(
        "https://webpagelinkanalyser.onrender.com/url",
        {
          url,
        }
      );

      setUrl("");
      setLinks(response.data.links);
      setError(null);
    } catch (error) {
      console.error("Error analyzing links:", error.message);
      setLinks([]);
      setError("Error analyzing links. Please try again.");
    }
  };

  const isButtonDisabled = !url.trim();

  return (
    <div>
      <h1>Webpage Link Analyser</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleUrlChange}
      />
      <button onClick={handleAnalyzeClick} disabled={isButtonDisabled}>
        Analyze
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <strong>URL:</strong> {link.href},{" "}
            <strong>Opens in New Tab:</strong>{" "}
            {link.opensInNewTab ? "Yes" : "No"}, <strong>Status:</strong>{" "}
            {link.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
