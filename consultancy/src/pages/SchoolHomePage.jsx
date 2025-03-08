import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Gallery from './Gallery.jsx';
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { CalendarDays, GraduationCap, Users, Globe } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SchoolHomePage() {
  const images = [
    "/images/Srivenkateshwar_School.jpg",
    "/images/full view.jpeg",
    "/images/hindi class.jpeg",
  ];

  return (
    <div className="min-h-screen text-gray-900">
      {/* Hero Section with Fade-in & Scale-up */}
      <motion.header
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Srivenkateshwar_School.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-3xl text-white">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl font-extrabold tracking-tight"
          >
            Sri Venkateshwara A1 is more than just a place to get an education.
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-lg bg-gray-700 bg-opacity-50 px-4 py-2 rounded-md max-w-fit mx-auto"
          >
            Join a learning environment where innovation meets excellence.
          </motion.p>
          <a
      href="#explore"
      className="relative mt-6 inline-block px-6 py-3 bg-red-900 text-white font-semibold text-lg rounded-full 
                 shadow-md border-2 border-white/30 overflow-hidden group transition-all duration-300 ease-in-out hover:scale-105"
    >
      {/* Shine Effect */}
      <span className="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent 
                      opacity-50 -translate-x-full group-hover:animate-shine"></span>

      {/* Button Text */}
      <span className="relative">Explore Now</span>

      {/* Add this CSS in your global styles or inside a <style> tag */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100px); }
            60% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }

          .group-hover:animate-shine {
            animation: shine 1.5s ease-out infinite;
          }
        `}
      </style>
    </a>
    <div className="absolute right-[-10px] top-1.2/2 transform -translate-y-1/2 w-40 h-40">
  <DotLottieReact 
    src="https://lottie.host/f308b9bf-e716-4a33-802b-4563d2ab866d/O9vE4Ijmvd.lottie" 
    loop 
    autoplay 
  />
</div>
   </div>
      </motion.header>

      {/* Statistics Section with Slide-up Animation */}
      <section className="relative -mt-30 z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "34", label: "Years Since Establishment", icon: <CalendarDays size={40} className="text-gray-900" /> },
            { value: "9000", label: "Students in 2022", icon: <GraduationCap size={40} className="text-gray-900" /> },
            { value: "1500", label: "Staff", icon: <Users size={40} className="text-gray-900" /> },
            { value: "300000", label: "Alumni", icon: <Globe size={40} className="text-gray-900" /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 shadow-md text-center border border-gray-300 flex flex-col justify-center items-center rounded-lg bg-white text-gray-900"
            >
              <div className="w-14 h-14 flex justify-center items-center bg-gray-200 rounded-full">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-red-900 mt-2">{stat.value}</h3>
              <p className="text-gray-700 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section with Hover Scale Animation */}
      <section
        id="features"
        className="py-16 px-6 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/images/features-bg.jpg')" }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white bg-black bg-opacity-50 px-4 py-2 inline-block rounded-md">
          Why Choose Us?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Expert Teachers", desc: "Guidance from the best educators." },
            { title: "Advanced Labs", desc: "Cutting-edge technology for hands-on learning." },
            { title: "Exciting Activities", desc: "A variety of programs to develop talents." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-200 transition"
            >
              <h3 className="text-2xl font-semibold text-blue-700">{feature.title}</h3>
              <p className="text-gray-700 mt-3">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image Carousel with Smooth Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-7xl mx-auto my-12 overflow-hidden rounded-lg shadow-lg"
      >
        <Swiper
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect="fade"
          modules={[Navigation, Autoplay, EffectFade]}
          className="w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      <Gallery/>
    </div>
  );
}
