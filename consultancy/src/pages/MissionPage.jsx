import React from "react";

// Styles for the container and sections
const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", // Gradient background for the page
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
};

const missionTitleStyle = {
  fontSize: "3rem",
  fontWeight: "700",
  textAlign: "center",
  color: "#2c3e50",
  marginBottom: "30px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  background: "linear-gradient(to right, #2980b9, #8e44ad)",
  "-webkit-background-clip": "text",
};

const sectionStyle = {
  marginBottom: "40px",
  padding: "30px",
  borderRadius: "10px",
  backgroundColor: "#ffffff", // White background for each section
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for depth
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  hoverEffect: {
    transform: "scale(1.05)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  },
};

const sectionTitleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#2980b9", // Blue color for titles
  marginBottom: "15px",
  transition: "color 0.3s ease",
  cursor: "pointer",
};

const sectionContentStyle = {
  fontSize: "1.2rem",
  color: "#555",
  lineHeight: "1.8",
  marginBottom: "20px",
  letterSpacing: "0.5px",
};

const buttonStyle = {
  padding: "12px 30px",
  fontSize: "1.2rem",
  backgroundColor: "#2980b9",
  color: "#fff",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease, transform 0.3s ease",
  fontWeight: "600",
};

const buttonHoverStyle = {
  backgroundColor: "#3498db", // Darker blue on hover
  transform: "scale(1.05)",
};

const missionPageStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const MissionPage = () => {
  return (
    <div style={containerStyle}>
      <h2 style={missionTitleStyle}>Our Mission</h2>
      <div style={missionPageStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Effective Child Development</h3>
          <p style={sectionContentStyle}>
            Sanction the role of teachers, parents, and others to continuously support effective child development.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Holistic Education</h3>
          <p style={sectionContentStyle}>
            Adapt children with holistic education, promoting tolerance and understanding in every step.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Activity-Based Learning</h3>
          <p style={sectionContentStyle}>
            Implement activity-based learning within the school curriculum to engage children in an interactive way.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Regular Support for Teachers</h3>
          <p style={sectionContentStyle}>
            Host teachers and support staff regularly to meet the growth needs of education for both students and educators.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Instilling Values and Character</h3>
          <p style={sectionContentStyle}>
            Embed values and character into children from their early days, building a foundation for their future.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Obedience and Regulation</h3>
          <p style={sectionContentStyle}>
            Achieve obedience to regulatory modules by encouraging students to follow applicable practices.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Adapting to Modern Learning Needs</h3>
          <p style={sectionContentStyle}>
            Multifaceted learning tracks and methodologies to express the needs of today's world and prepare children for the future.
          </p>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Join Us in Our Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
