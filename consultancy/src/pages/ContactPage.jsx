import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 text-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <h1 className="text-5xl font-bold text-blue-700">Contact Us</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Have questions? Get in touch with us.
        </p>
      </motion.header>

      {/* Contact Form & Details */}
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Send Us a Message</h2>
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg mb-3" />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg mb-3" />
          <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg mb-3" rows="4"></textarea>
          <button className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
        </motion.form>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Reach Out</h2>
          <p><strong>📍 Address:</strong> 123 School Lane, City, Country</p>
          <p><strong>📞 Phone:</strong> +123 456 7890</p>
          <p><strong>✉️ Email:</strong> info@school.com</p>
          <p className="mt-3 text-blue-600 font-semibold">Follow us on social media!</p>
        </motion.div>
      </div>
    </div>
  );
}
