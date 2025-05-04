import { useState, useEffect } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import "./Gallery1.css";

export default function GalleryModern() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://consultancy-sea9.onrender.com/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const currentEvent = events[currentIndex] || {};

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
      <h1 className="gallery-heading">Celebrations</h1>

      <div className="carousel-card">
        <div className="image-container">
          <img src={currentEvent.imageUrl} alt={currentEvent.title} className="carousel-image" />
          <div className="overlay">
            <h2 className="overlay-title">{currentEvent.title}</h2>
            <p className="overlay-description">{currentEvent.description}</p>
          </div>
        </div>

        <div className="carousel-buttons">
          <button onClick={goPrev} className="nav-btn">
            <ArrowLeftCircle size={36} />
          </button>
          <button onClick={goNext} className="nav-btn">
            <ArrowRightCircle size={36} />
          </button>
        </div>
      </div>
    </div>
  );
}
