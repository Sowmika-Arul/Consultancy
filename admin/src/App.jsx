import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDash";
import Login from "./components/AdminLogin";
import EventForm from "./components/EventForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/eventForm" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
