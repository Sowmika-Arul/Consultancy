import { motion } from "framer-motion";

const facilities = [
  { name: "Library", desc: "A vast collection of books and digital resources.", img: "/images/library.jpg" },
  { name: "Science Labs", desc: "Equipped with state-of-the-art tools for research.", img: "/images/Science lab.jpg" },
  { name: "Sports", desc: "Indoor & outdoor courts for various sports.", img: "/images/sports.jpg" },
  { name: "Hostels", desc: "Hostels: Comfortable and secure residential spaces designed for student living and community engagement.", img: "/images/hostel.avif" },
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 text-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <h1 className="text-5xl font-bold text-blue-700">Our Facilities</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          We provide world-class infrastructure to support education and extracurricular activities.
        </p>
      </motion.header>

      {/* Facilities Grid */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img src={facility.img} alt={facility.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-blue-600">{facility.name}</h2>
              <p className="text-gray-700 mt-2">{facility.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
