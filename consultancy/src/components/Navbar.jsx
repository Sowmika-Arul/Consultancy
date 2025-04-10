import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react"; 


export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center"
    >
     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <img src="/images/school logo.png" alt="School Logo" width="30" height="30" />
  <h1 className="text-2xl font-bold text-red-900">Sri Venkateshwara A1</h1>
</div>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-500 transition">Home</Link>
        <Link to="/facilities" className="hover:text-blue-500 transition">Facilities</Link>
        <Link to="/faculty" className="hover:text-blue-500 transition">Faculty</Link>
        <Link to="/about" className="hover:text-blue-500 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
      </div>
    </motion.nav>
  );
}
