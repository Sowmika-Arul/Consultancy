import { useState, useEffect } from "react";
import "./Gallery1.css";

export default function GalleryModern() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [years, setYears] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All");

  // Fetch events
  useEffect(() => {
    fetch("https://consultancy-sea9.onrender.com/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Fetch available years from backend
  useEffect(() => {
    fetch("https://consultancy-sea9.onrender.com/events/years")
      .then((res) => res.json())
      .then((data) => setYears(data))
      .catch((err) => console.error("Error fetching years:", err));
  }, []);

  // Update filtered events when year changes
  useEffect(() => {
    if (selectedYear === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear().toString() === selectedYear;
      });
      setFilteredEvents(filtered);
      setCurrentIndex(0); // Reset carousel
    }
  }, [selectedYear, events]);

  // Auto-slide logic
  useEffect(() => {
    if (isHovered || filteredEvents.length <= 1) return;
    const interval = setInterval(() => {
      goNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, filteredEvents]);

  const goPrev = () => {
    setCurrentIndex(prev =>
      prev === 0 ? filteredEvents.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex(prev =>
      prev === filteredEvents.length - 1 ? 0 : prev + 1
    );
  };

  const currentEvent = filteredEvents[currentIndex] || {};

  return (
    <div className="gallery-container">
      <div className="animated-blobs">
        <div className="blob" style={{ background: "#a18cd1", top: "10%", left: "5%", animationDelay: "0s" }}></div>
        <div className="blob" style={{ background: "#fbc2eb", top: "20%", left: "70%", animationDelay: "2s" }}></div>
        <div className="blob" style={{ background: "#fad0c4", top: "40%", left: "30%", animationDelay: "4s" }}></div>
        <div className="blob" style={{ background: "#a1c4fd", top: "60%", left: "80%", animationDelay: "6s" }}></div>
        <div className="blob" style={{ background: "#c2e9fb", top: "75%", left: "15%", animationDelay: "8s" }}></div>
        <div className="blob" style={{ background: "#d4fc79", top: "85%", left: "50%", animationDelay: "10s" }}></div>
        <div className="ring"></div>
      </div>

      <h1 className="gallery-heading">CELEBRATIONS</h1>

      {/* Year Filter */}
      <div className="filter-container">
        <label htmlFor="year-select" className="filter-label">Filter by Year: </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="year-dropdown"
        >
          <option value="All">All</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="carousel-card">
        <div
          className="image-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {currentEvent.imageUrl ? (
            <>
              <img
                src={currentEvent.imageUrl}
                alt={currentEvent.title}
                className="carousel-image"
              />
              <div className="overlay">
                <h2 className="overlay-title">{currentEvent.title}</h2>
                <p className="overlay-description">{currentEvent.description}</p>
              </div>
            </>
          ) : (
            <p className="no-event-message">No events to display</p>
          )}
        </div>
      </div>
    </div>
  );
}
