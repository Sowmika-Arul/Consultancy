import { motion } from "framer-motion";
import { CheckCircle, Heart, Lightbulb, BookOpen, Handshake, Users, Eye } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-900 p-8">
      {/* Vision Section */}
      <motion.section initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center py-16">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-10">Our Vision</h1>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 transition-all duration-300 hover:shadow-2xl"
    >
      <motion.div whileHover={{ rotate: 10 }}>
        <item.icon size={50} className="text-blue-500" />
      </motion.div>
      <h2 className="text-2xl font-semibold text-blue-600 mt-4">{item.title}</h2>
      <p className="text-gray-700 mt-2">{item.desc}</p>
    </motion.div>
  );
}
