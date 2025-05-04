import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolHomePage from "./pages/SchoolHomePage";
import AboutPage from "./pages/AboutPage";
import Gallery from "./pages/Gallery1";
import Facilities from "./pages/Facilities";
import ContactPage from "./pages/ContactPage";
import Vission from "./pages/Vission";
import EventForm from "./pages/EventForm";
import Mission from "./pages/MissionPage";
import Faculty from "./pages/FacultyPage";
import Navbar from "./components/Navbar"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is now always present */}
      <Routes>
        <Route path="/" element={<SchoolHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/eventForm" element={<EventForm />} />
        <Route path="/vission" element={<Vission />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/admissionForm" element={<AdmissionForm />} />
      </Routes>
    </Router>
  );
}

export default App;
