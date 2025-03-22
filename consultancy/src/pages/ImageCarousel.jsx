import { motion } from "framer-motion";

const images = [
  "/images/playing.jpeg",
  "/images/planting.jpeg",
  "/images/temple.jpeg",
  "/images/writing.jpeg",
];

export default function FullScreenMasonryGallery() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center py-16 px-4 bg-white overflow-hidden">
      
      {/* Floating Light Patterns */}
      <motion.div
        className="absolute top-36 left-28 w-28 h-28 bg-purple-300 opacity-40 blur-xl rounded-full"
        animate={{ y: [0, 12, 0], x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-36 right-28 w-24 h-24 bg-blue-400 opacity-40 blur-xl rounded-full"
        animate={{ y: [0, -8, 0], x: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-24 h-24 bg-yellow-300 opacity-40 blur-xl rounded-full"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Geometric Line Art */}
      <motion.div
        className="absolute top-16 left-16 w-16 h-16 border-t-2 border-l-2 border-gray-300 opacity-50"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-16 w-20 h-20 border-b-2 border-r-2 border-gray-400 opacity-50"
        animate={{ rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/3 w-14 h-14 border-t-2 border-b-2 border-gray-300 opacity-40"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      {/* Gallery Heading */}
      <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-10 relative z-10">
        Capturing Our Journey
      </h2>

      {/* Image Grid */}
      <div className="relative w-full max-w-5xl columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4 z-10">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Gallery ${index + 1}`}
            className="w-full rounded-lg shadow-lg border border-gray-200 transition-all duration-500"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0, 0, 255, 0.3)" }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </div>
    </div>
  );
}
