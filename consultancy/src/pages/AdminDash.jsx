import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, UserX, UserPlus, X } from "lucide-react";

export default function AdmissionDashboard() {
  const [search, setSearch] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://consultancy-sea9.onrender.com/api/admissions")
      .then((res) => res.json())
      .then((data) => {
        setApplicants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filtered = applicants.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
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
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-6 text-gray-800 mt-12">
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

      {/* Table */}
      <div className="overflow-auto rounded-xl shadow border border-gray-200">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading applicants...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead className="bg-blue-100 text-blue-800 text-sm font-semibold">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Grade</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-blue-50 cursor-pointer"
                  onClick={() => setSelectedApplicant(a)}
                >
                  <td className="p-3">{a.name}</td>
                  <td className="p-3">{a.admissionStandard}</td>
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
        )}
      </div>

      {/* Modal to view detailed applicant info */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedApplicant(null)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedApplicant.name}</p>
              <p><strong>Gender:</strong> {selectedApplicant.gender}</p>
              <p><strong>Date of Birth:</strong> {selectedApplicant.dob}</p>
              <p><strong>Father's Name:</strong> {selectedApplicant.fatherName}</p>
              <p><strong>Mother's Name:</strong> {selectedApplicant.motherName}</p>
              <p><strong>Profession:</strong> {selectedApplicant.profession}</p>
              <p><strong>Previous School:</strong> {selectedApplicant.previousSchool}</p>
              <p><strong>Address:</strong> {selectedApplicant.address}</p>
              <p><strong>Phone:</strong> {selectedApplicant.phone}</p>
              <p><strong>Aadhar:</strong> {selectedApplicant.aadhar}</p>
              <p><strong>Caste:</strong> {selectedApplicant.caste}</p>
              <p><strong>Disability:</strong> {selectedApplicant.disability}</p>
              <p><strong>Admission Standard:</strong> {selectedApplicant.admissionStandard}</p>
              <p><strong>Date of Submission:</strong> {selectedApplicant.date}</p>
              <p><strong>Signature:</strong> {selectedApplicant.signature}</p>
              {selectedApplicant.photo && (
                <img src={selectedApplicant.photo} alt="Student" className="mt-4 rounded w-32 h-32 object-cover" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
