import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolHomePage from "./pages/SchoolHomePage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/AdminLogin";
import FacilitiesPage from "./pages/FacilitiesPage";
import Gallery from "./pages/Gallery1";
import ContactPage from "./pages/ContactPage";
import EventForm from "./pages/EventForm";
import Mission from "./pages/MissionPage";
import Navbar from "./components/Navbar"; // Import the Navbar component
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is now always present */}
      <Routes>
        <Route path="/" element={<SchoolHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/eventForm" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
