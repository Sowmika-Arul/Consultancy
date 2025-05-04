import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components/ui/select';
import { motion } from 'framer-motion';

const staffTypes = [
  'all',
  'pg_staff',
  'bt_staff',
  'sgt_staff',
  'primary_staff',
  'office_staff',
];

const staffLabels = {
  all: 'All Staff',
  pg_staff: 'PG Staff',
  bt_staff: 'BT Staff',
  sgt_staff: 'SGT Staff',
  primary_staff: 'Primary Staff',
  office_staff: 'Office Staff',
};

export default function FacultyDashboard() {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [staffCounts, setStaffCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://consultancy-sea9.onrender.com/api/faculty?type=all')
      .then(res => res.json())
      .then(data => {
        setFaculty(data);
        const counts = {};
        data.forEach(item => {
          counts[item.type] = (counts[item.type] || 0) + 1;
        });
        // Add total count for 'all'
        counts['all'] = data.length;
        setStaffCounts(counts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load faculty data');
        setLoading(false);
      });
  }, []);

  const filteredFaculty = faculty.filter(person => {
    const matchesType = filter === 'all' || person.type === filter;
    const matchesSearch = person.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-8 mt-20 space-y-12 bg-gradient-to-b from-gray-50 to-white min-h-screen font-serif">
      {/* DASHBOARD SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {staffTypes.map(type => (
          <motion.div whileHover={{ scale: 1.04 }} key={type}>
            <Card
              onClick={() => setFilter(type)}
              className={`cursor-pointer rounded-xl border-2 transition-all shadow-sm hover:shadow-md backdrop-blur-md ${
                filter === type
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-500'
                  : 'bg-white hover:border-gray-300'
              }`}
            >
              <CardContent className="p-5 text-center space-y-1">
                <p className="text-sm font-medium text-gray-600 tracking-wide">
                  {staffLabels[type]}
                </p>
                <p className="text-2xl font-bold text-blue-700">{staffCounts[type] || 0}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="🔍 Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-sm shadow-md"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="max-w-xs shadow-md">
            <SelectValue placeholder="Select staff type" />
          </SelectTrigger>
          <SelectContent>
            {staffTypes.map(type => (
              <SelectItem key={type} value={type}>
                {staffLabels[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* LOADING/ERROR */}
      {loading && <p className="text-center text-gray-500 italic">Loading faculty data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && filteredFaculty.length === 0 && (
        <p className="text-center text-gray-400 italic">No matching faculty found.</p>
      )}

      {/* FACULTY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((person, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <Card
              className="rounded-2xl bg-white/70 backdrop-blur-lg border shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedFaculty(person)}
            >
              <CardContent className="p-6 space-y-2">
                <p className="text-lg font-semibold text-gray-900">{person.name}</p>
                <p className="text-sm text-gray-700 italic">{person.qualification}</p>
                <p className="text-sm font-medium text-blue-600">{person.designation}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* DETAILS PANEL */}
      {selectedFaculty && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white/90 backdrop-blur-lg shadow-xl border-l z-50 overflow-y-auto transition-all duration-300">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Faculty Profile</h2>
              <button
                className="text-red-500 hover:text-red-600 font-medium"
                onClick={() => setSelectedFaculty(null)}
              >
                ✕ Close
              </button>
            </div>
            <hr />
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">{selectedFaculty.name}</p>
              <p className="text-sm text-gray-700">
                <strong>Qualification:</strong> {selectedFaculty.qualification}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Designation:</strong> {selectedFaculty.designation}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Staff Type:</strong> {staffLabels[selectedFaculty.type]}
              </p>
            </div>

            {/* Class Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Class Details</h3>
              <ul className="list-disc text-sm text-gray-700 pl-5 space-y-1 mt-1">
                <li>Subject: English, History</li>
                <li>Class In-Charge: Grade 8 - Section B</li>
                <li>Available Hours: 9 AM - 12 PM</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
