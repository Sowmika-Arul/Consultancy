import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Gallery() {
  // Dummy Data for Books
  const books = [
    { id: 1, title: "Book One", desc: "This is the first book.", img: "/images/temple.jpeg" },
    { id: 2, title: "Book Two", desc: "This is the second book.", img: "/images/Assembly.jpeg" },
    { id: 3, title: "Book Three", desc: "This is the third book.", img: "/images/writing.jpeg" },
    { id: 4, title: "Book Four", desc: "This is the fourth book.", img: "/images/sports.jpg" },
    { id: 5, title: "Book Five", desc: "This is the fifth book.", img: "/images/library.jpg" },
  ];

  
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500,
    slidesToShow: 4, // Show 4 items per row
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Small screens
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
          <Book key={book.id} book={book} />
        ))}
      </Slider>
    </div>
  );
}

// Individual Book Component
function Book({ book }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={styles.book}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Cover */}
      <div
        style={{
          ...styles.cover,
          backgroundImage: `url("${book.img}")`,
          transform: isHovered ? "rotateY(-80deg)" : "rotateY(0deg)",
        }}
      ></div>

      {/* Text Inside */}
      <div style={{ ...styles.textInside, opacity: isHovered ? "1" : "0" }}>
        <p style={styles.title}>{book.title}</p>
        <p style={styles.desc}>{book.desc}</p>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  gallery: {
    width: "80%",
    margin: "auto",
    padding: "20px",
    marginTop: "30px", // Push the gallery down
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

