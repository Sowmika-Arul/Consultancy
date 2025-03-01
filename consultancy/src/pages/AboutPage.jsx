import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 text-gray-900">
      {/* Header */}
      <motion.header
    initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <h1 className="text-5xl font-bold text-blue-700">About Our School</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Our school is a center of excellence, fostering academic brilliance and personal growth.
        </p>
      </motion.header>

      {/* Mission & Vision Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-600">Our Mission</h2>
          <p className="text-gray-700 mt-3">
            To provide a nurturing environment that enables students to develop into confident and responsible individuals.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-600">Our Vision</h2>
          <p className="text-gray-700 mt-3">
            To be a global leader in education, fostering innovation, leadership, and critical thinking.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
