import { useState, useEffect } from "react";
import "./Gallery1.css";

export default function Gallery1() {
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const filteredEvents =
    selectedYear === "all"
      ? events
      : events.filter((event) => event.year === selectedYear);
  const event = filteredEvents[currentPage] || {};

  return (
    <div className="gallery-container">
      {/* Filter Sidebar */}
      <div className="filter-sidebar">
        <h3>Filter by Year</h3>
        <select onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="all">All</option>
          {[...new Set(events.map((event) => event.year))].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Book Component */}
      <div className="book-container">
        <div className={`book ${isBookOpen ? "open" : ""}`}>
          {/* Clickable Cover */}
          <div className="book-cover" onClick={() => setIsBookOpen(true)}>
            School Events
          </div>

          {/* Full Image Page */}
          {isBookOpen && (
            <div className="page">
              {event.imageUrl ? (
                <>
                  <img src={event.imageUrl} alt={event.title} />
                  <div className="event-details">
                    <h2>{event.title || "No Event"}</h2>
                    <p>{event.description || "No description available."}</p>
                  </div>
                </>
              ) : (
                <h2>No Image Available</h2>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {isBookOpen && (
          <div className="navigation">
            <button
              className="flip-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            >
              &larr; Prev
            </button>
            <button
              className="flip-button"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, filteredEvents.length - 1)
                )
              }
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
