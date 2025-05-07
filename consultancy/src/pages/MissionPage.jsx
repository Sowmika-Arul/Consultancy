import { motion } from "framer-motion";
import { Pin } from "lucide-react";

const missions = [
  "Adapt children with holistic education with appropriate tolerance.",
  "Teaching activity-based learning in the school curricular.",
  "Host the teacher and support staff regularly to meet the growth needs for education.",
  "Yoke value and character in the minds of the children from their early days.",
  "Achieve obedience to the regulatory module during applicable practices.",
  "Multifaceted the learning track and methodology to express the needs of today's world.",
  "Sanction the role of teachers, parents, and others in the continuance of effective child development.",
];

export default function Mission() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-24 relative bg-green-900 border-[6px] border-gray-700 rounded-lg shadow-lg overflow-hidden">
      
      {/* Blackboard Texture Effect */}
      <div className="absolute inset-0 bg-[url('/blackboard-texture.png')] opacity-20 pointer-events-none"></div>

      {/* Title with Chalk Effect */}
      <motion.h2
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 text-white tracking-wide relative font-[Chalkduster]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Mission
        <motion.span
          className="block w-24 sm:w-28 h-1 bg-white mx-auto mt-2 rounded-full opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        ></motion.span>
      </motion.h2>

      {/* Mission Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4 lg:px-0">
        {missions.map((mission, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`relative ${
              (missions.length % 3 === 1 && index === missions.length - 1) ? "sm:col-span-2 lg:col-span-3" : ""
            }`}
          >
            {/* Pinned Paper Effect */}
            <div className="relative p-5 bg-white text-gray-900 shadow-lg rounded-md transition-all hover:shadow-xl
              before:absolute before:inset-0 before:bg-[url('/paper-crumpled-texture.png')] before:opacity-40 before:pointer-events-none
              after:absolute after:-bottom-2 after:left-0 after:w-full after:h-4 after:bg-gradient-to-t after:from-gray-400 after:to-transparent after:opacity-30
              border border-gray-300"
            >
              {/* Pushpin Effect */}
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-2 rounded-full shadow-lg z-10"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                <Pin size={16} />
              </motion.div>

              {/* Mission Text with Handwritten Font */}
              <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed font-[PatrickHand] text-gray-800">
                {mission}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
