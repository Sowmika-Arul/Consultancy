import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Heart, Lightbulb, BookOpen, Handshake, Users, Eye } from "lucide-react";

const visionData = [
  { title: "Serve", desc: "Joyful thought forever", icon: Heart },
  { title: "Admire", desc: "Ignite a life of knowledge with attitude", icon: Lightbulb },
  { title: "Teach", desc: "Culture, self-discipline, and encourage others", icon: BookOpen },
  { title: "Yield", desc: "Nourish relationships and live fully", icon: Handshake },
  { title: "Adopt", desc: "Act with balanced emotions while nurturing a child", icon: Users },
  { title: "Magnitude", desc: "Read a child's mind and guide them", icon: Eye },
];

export default function VisionMissionPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-50 text-gray-900 p-6 md:p-10 flex flex-col justify-center items-center">
      
      {/* Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-20 h-20 md:w-36 md:h-36 mx-auto mb-8 md:absolute md:left-10 md:top-1/3"
      >
        <Player src="/animation.json" loop autoplay />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-6 md:py-12 w-full"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-8 md:mb-12 tracking-wide drop-shadow-md">
          Our Vision
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionData.map((item, index) => (
            <VisionCard key={index} item={item} index={index} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function VisionCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, translateY: -5, boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.2)" }}
      className="relative bg-white bg-opacity-90 backdrop-blur-2xl rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-400 w-full sm:w-64"
    >
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-full shadow-md">
        <item.icon size={48} className="text-white drop-shadow-md" />
      </div>
      <h2 className="text-lg md:text-xl font-semibold text-blue-700 mt-4 tracking-wide">{item.title}</h2>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}
