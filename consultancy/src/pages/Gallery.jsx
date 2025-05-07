import { useState, useEffect } from "react";
import Slider from "react-slick";


export default function Gallery() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://consultancy-sea9.onrender.com/events")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={styles.gallery}>
      <Slider {...settings}>
        {books.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </Slider>
    </div>
  );
}

function Book({ book }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={styles.book}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...styles.cover,
          backgroundImage: `url("${book.imageUrl}")`,
          transform: isHovered ? "rotateY(-80deg)" : "rotateY(0deg)",
        }}
      ></div>

      <div style={{ ...styles.textInside, opacity: isHovered ? "1" : "0" }}>
        <p style={styles.title}>{book.title}</p>
        <p style={styles.desc}>{book.description}</p>
      </div>
    </div>
  );
}

const styles = {
  gallery: {
    width: "80%",
    margin: "auto",
    padding: "20px",
    marginTop: "30px",
  },
  book: {
    position: "relative",
    borderRadius: "10px",
    width: "220px",
    height: "300px",
    backgroundColor: "whitesmoke",
    boxShadow: "1px 1px 12px #000",
    perspective: "2000px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    overflow: "hidden",
  },
  cover: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.5s ease-in-out",
    transformOrigin: "left",
    boxShadow: "1px 1px 12px #000",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  textInside: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    transition: "opacity 0.5s ease-in-out",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  desc: {
    fontSize: "14px",
  },
};
