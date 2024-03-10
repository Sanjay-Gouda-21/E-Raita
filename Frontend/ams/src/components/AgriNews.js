import React, { useState, useEffect } from "react";
import "./css/AgriNews.css";

export default function Agrinews() {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3003/api/schemes");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleApply = (applyUrl) => {
    window.open(applyUrl, "_blank");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bannernews"></div>
      <div className="agri-news-container">
        <div className="news-list">
          {newsData.map((newsItem) => (
            <>
              <div key={newsItem.Scheme_id} className="news-item">
                <img src={newsItem.image_url} alt={newsItem.scheme_name} />

                <div>
                  <h2>{newsItem.Scheme_title}</h2>
                  <p>{newsItem.Scheme_desc}</p>
                  <p>
                    <span>Application Period:</span>
                    {newsItem.formatted_date_range}
                  </p>
                  <button onClick={() => handleApply(newsItem.apply_link)}>
                    Apply
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
