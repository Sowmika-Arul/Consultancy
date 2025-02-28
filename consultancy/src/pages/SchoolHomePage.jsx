import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button } from "../components/ui/button";

export default function SchoolHomePage() {
  const images = [
    "/images/school1.jpg",
    "/images/school2.jpg",
    "/images/school3.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full py-4 px-8 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold text-blue-700">Sri Venkateswara Matric Higher Secondary School, Salem</h1>
        <div className="space-x-6">
          <a href="#about" className="hover:text-blue-500 transition">About</a>
          <a href="#features" className="hover:text-blue-500 transition">Features</a>
          <a href="#contact" className="hover:text-blue-500 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center text-center min-h-screen px-6 pt-20 bg-gradient-to-r from-blue-100 to-blue-300 text-gray-900">
        <h2 className="text-5xl font-extrabold tracking-tight">Welcome to Our School</h2>
        <p className="text-lg mt-4 max-w-2xl text-gray-700">
          A place where curiosity meets excellence. Empowering students for a brighter future.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Explore Now
        </Button>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">Why Choose Us?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Expert Teachers", desc: "Guidance from the best in the field." },
            { title: "Modern Facilities", desc: "State-of-the-art classrooms & labs." },
            { title: "Vibrant Community", desc: "Nurturing an inclusive culture." },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition border border-gray-200">
              <h3 className="text-2xl font-semibold text-blue-700">{feature.title}</h3>
              <p className="text-gray-700 mt-3">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel Section */}
      <div className="max-w-5xl mx-auto my-16">
        <Swiper navigation={true} modules={[Navigation]} className="rounded-lg shadow-lg">
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-80 object-cover rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-white text-gray-700 text-center py-6 border-t">
        <p>&copy; {new Date().getFullYear()} Our School. All rights reserved.</p>
      </footer>
    </div>
  );
}
