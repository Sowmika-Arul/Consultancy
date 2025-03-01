import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";

export default function SchoolHomePage() {
  const images = [
    "/images/Srivenkateshwar_School.jpg",
    "/images/Srivenkateshwar_School1.jpg",
    "/images/Srivenkateshwar_School2.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 text-gray-900">
      {/* Hero Section with Text Animation */}
      <motion.header
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center items-center text-center min-h-screen px-6 pt-20 bg-gradient-to-r from-blue-100 to-blue-300 text-gray-900"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-extrabold tracking-tight"
        >
          Welcome to Sri Venkateshwara School
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg mt-4 max-w-2xl text-gray-700"
        >
          A place where creativity, knowledge, and innovation come together.
        </motion.p>
      </motion.header>

      {/* Features Section with Bounce Effect on Hover */}
      <section id="features" className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">Why Choose Us?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Expert Teachers", desc: "Guidance from the best educators." },
            { title: "Advanced Labs", desc: "Cutting-edge technology for hands-on learning." },
            { title: "Exciting Activities", desc: "A variety of programs to develop talents." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-200 transition"
            >
              <h3 className="text-2xl font-semibold text-blue-700">{feature.title}</h3>
              <p className="text-gray-700 mt-3">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image Carousel with Slide-in Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto my-16"
      >
        <Swiper navigation={true} modules={[Navigation]} className="rounded-lg shadow-lg">
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <motion.img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-80 object-cover rounded-lg"
                whileHover={{ scale: 1.02 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Footer with Gentle Fade-in */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        id="contact"
        className="bg-white text-gray-700 text-center py-6 border-t"
      >
        <p>&copy; {new Date().getFullYear()} Bright Future School. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
