import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolHomePage from "./pages/SchoolHomePage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/AdminLogin";
import Gallery from "./pages/Gallery1";
import Facilities from "./pages/Gallery";
import Dashboard from "./pages/AdminDash";
import ContactPage from "./pages/ContactPage";
import Vission from "./pages/Vission";
import EventForm from "./pages/EventForm";
import Mission from "./pages/MissionPage";
import Faculty from "./pages/FacultyPage";
import Navbar from "./components/Navbar"; // Import the Navbar component
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is now always present */}
      <Routes>
        <Route path="/" element={<SchoolHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/eventForm" element={<EventForm />} />
        <Route path="/vission" element={<Vission />} />
        <Route path="/adminDashBoard" element={<Dashboard />} />
        <Route path="/faculty" element={<Faculty />} />
      </Routes>
    </Router>
  );
}

export default App;
