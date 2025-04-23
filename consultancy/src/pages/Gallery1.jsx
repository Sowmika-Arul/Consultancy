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
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, events.length - 1));
  };

  const currentEvent = events[currentIndex] || {};

  return (
    <div className="animated-bg">
       <h1 className="gallery-heading">Celebrations</h1> {/* 🔥 New heading */}
      <div className="modern-gallery-wrapper">
        <div className="modern-left">
          <h2>{currentEvent.title}</h2>
          <p>{currentEvent.description}</p>
        </div>

        <div className="modern-right">
          <div className="modern-carousel">
            <div
              className="modern-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event, idx) => (
                <div className="modern-slide" key={idx}>
                  <img src={event.imageUrl} alt={event.title} />
                </div>
              ))}
            </div>
          </div>

          <div className="modern-controls">
            <button onClick={goPrev} disabled={currentIndex === 0}>
              <ArrowLeftCircle size={40} />
            </button>
            <button onClick={goNext} disabled={currentIndex === events.length - 1}>
              <ArrowRightCircle size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
