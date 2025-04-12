import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, UserX, UserPlus } from "lucide-react";

export default function AdmissionDashboard() {
  const [search, setSearch] = useState("");

  const applicants = [
    { id: 1, name: "Aarav Sharma", status: "Approved", grade: "Grade 1", date: "2025-03-01" },
    { id: 2, name: "Saanvi Patel", status: "Pending", grade: "Grade 2", date: "2025-03-03" },
    { id: 3, name: "Vihaan Verma", status: "Rejected", grade: "LKG", date: "2025-03-04" },
    { id: 4, name: "Anaya Reddy", status: "Approved", grade: "UKG", date: "2025-03-05" },
    { id: 5, name: "Ishaan Nair", status: "Pending", grade: "Grade 3", date: "2025-03-06" },
  ];

  const filtered = applicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

  const summary = {
    total: applicants.length,
    approved: applicants.filter((a) => a.status === "Approved").length,
    pending: applicants.filter((a) => a.status === "Pending").length,
    rejected: applicants.filter((a) => a.status === "Rejected").length,
  };

  const statusColor = {
    Approved: "text-green-600 bg-green-100",
    Pending: "text-yellow-600 bg-yellow-100",
    Rejected: "text-red-600 bg-red-100",
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-6 text-gray-800 mt-12 center">
      <motion.h1
        className="text-3xl font-bold mb-6 text-blue-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admissions Dashboard
      </motion.h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card icon={<UserPlus />} title="Total Applicants" count={summary.total} color="bg-blue-100 text-blue-700" />
        <Card icon={<CheckCircle />} title="Approved" count={summary.approved} color="bg-green-100 text-green-700" />
        <Card icon={<Clock />} title="Pending" count={summary.pending} color="bg-yellow-100 text-yellow-700" />
        <Card icon={<UserX />} title="Rejected" count={summary.rejected} color="bg-red-100 text-red-700" />
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search applicant by name..."
        className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Applicants Table */}
      <div className="overflow-auto rounded-xl shadow border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-100 text-blue-800 text-sm font-semibold">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Date Applied</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.grade}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[a.status]}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Summary Card Component
function Card({ icon, title, count, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-4 rounded-xl shadow flex items-center space-x-4 ${color}`}
    >
      <div className="p-2 rounded-full bg-white text-2xl">{icon}</div>
      <div>
        <h4 className="text-sm">{title}</h4>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </motion.div>
  );
}
