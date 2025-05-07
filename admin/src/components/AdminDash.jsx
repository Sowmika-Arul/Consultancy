import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, X, CalendarDays, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
    a.name?.toLowerCase().includes(search.toLowerCase())
  );

  const gradeCounts = applicants.reduce((acc, curr) => {
    acc[curr.admissionStandard] = (acc[curr.admissionStandard] || 0) + 1;
    return acc;
  }, {});

  const genderCounts = applicants.reduce(
    (acc, curr) => {
      if (curr.gender === "Male") acc.male += 1;
      else if (curr.gender === "Female") acc.female += 1;
      return acc;
    },
    { male: 0, female: 0 }
  );

  const disabilityCount = applicants.reduce(
    (acc, curr) => {
      if (curr.disability) acc += 1;
      return acc;
    },
    0
  );

  const summary = {
    total: applicants.length,
    male: genderCounts.male,
    female: genderCounts.female,
    withDisability: disabilityCount,
  };

  const rowColors = [
    "bg-blue-50",
    "bg-purple-50",
    "bg-pink-50",
    "bg-yellow-50",
    "bg-green-50",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 p-6 text-gray-800 mt-12">
      <motion.h1
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admissions Dashboard
      </motion.h1>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card
          icon={<UserPlus />}
          title="Total Applicants"
          count={summary.total}
          color="bg-gradient-to-r from-blue-200 to-purple-200 text-blue-900"
        />
        <Card
          icon={<Users />}
          title="Male Applicants"
          count={summary.male}
          color="bg-gradient-to-r from-green-200 to-blue-200 text-green-900"
        />
        <Card
          icon={<Users />}
          title="Female Applicants"
          count={summary.female}
          color="bg-gradient-to-r from-pink-200 to-purple-200 text-pink-900"
        />
        <Card
          icon={<UserPlus />}
          title="Applicants with Disabilities"
          count={summary.withDisability}
          color="bg-gradient-to-r from-yellow-200 to-orange-200 text-yellow-900"
        />
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search applicant by name..."
          className="w-full p-3 rounded-xl border border-gray-300 shadow focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Applicant Table */}
      <div className="overflow-hidden backdrop-blur-md bg-white/70 rounded-xl shadow border border-gray-200">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading applicants...</p>
        ) : (
          <div>
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-bold uppercase px-4 py-3">
              <div className="flex items-center gap-2">
                <UserPlus size={16} /> Name
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} /> Grade
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} /> Date
              </div>
            </div>

            {/* Table Rows */}
            {filtered.map((a, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 px-4 py-3 ${
                  rowColors[index % rowColors.length]
                } hover:bg-opacity-70 transition cursor-pointer border-t`}
                onClick={() => setSelectedApplicant(a)}
              >
                <div>{a.name}</div>
                <div>{a.admissionStandard}</div>
                <div>{a.date}</div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center p-6 text-gray-500">
                No applicants found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedApplicant(null)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-800">Applicant Details</h2>
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
                <img
                  src={selectedApplicant.photo}
                  alt="Student"
                  className="mt-4 rounded w-32 h-32 object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Grade-wise Application Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(gradeCounts).map(([grade, count]) => ({
              grade,
              count,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Link to="/eventForm" className="fixed top-6 right-6">
  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-blue-700 transition">
    Event Form
  </button>
</Link>

    </div>
  );
}

function Card({ icon, title, count, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform duration-200 ${color}`}
    >
      <div className="p-3 rounded-full bg-white text-2xl shadow">{icon}</div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </motion.div>
  );
}
