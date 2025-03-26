import React from "react";
import { useEffect, useState } from "react";
import { get_notes, logout } from "../endpoints/api";
import { useNavigate } from "react-router-dom";


const projects = [
  {
    title: "Quickart (E-Commerce Platform)",
    duration: "Dec 2024 - Feb 2025",
    techStack: ["PHP (Laravel)", "Node.js", "JavaScript", "AJAX", "Guzzle Client"],
    description:
      "Developed an eCommerce website with dynamic product fetching, real-time updates, and API integration.",
    impact: [
      "Optimized performance and reduced loading times",
      "Enabled real-time inventory updates, preventing overselling",
    ],
  },
  {
    title: "Police Assistant – AI-Based FIR Filing",
    duration: "Dec 2023 - Apr 2024",
    techStack: ["Python", "Django", "NLP", "Voice Recognition API", "SQL/NoSQL"],
    description:
      "Built an AI-powered voice-based FIR filing system with NLP processing for legal accuracy.",
    impact: [
      "Reduced manual data entry for law enforcement",
      "Improved accuracy by ensuring legal compliance through AI",
    ],
  },
  {
    title: "MySQL-Based Chat System",
    duration: "Nov 2024",
    techStack: ["Python", "MySQL", "Streamlit", "Gemini API"],
    description:
      "Developed a real-time chat system with AI-powered responses and secure message storage.",
    impact: [
      "Enabled real-time messaging with database integration",
      "Enhanced customer support with AI-driven chatbot responses",
    ],
  },
];

const AboutMeDashboard = () => {
  const [Notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const logoutHandle = async () => {
    const response = await logout();
    if (response) {
      navigate("/login");
    } else {
      console.log("Logout failed");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const Notes = await get_notes();
      setNotes(Notes);
    };

    fetchNotes();
  }, []);
  return (
    <div className="container mt-5">
      <button className="btn btn-danger" onClick={logoutHandle}>Logout</button>
      <h1 className="text-center mb-4">
        {Notes.length > 0 ? (
          Notes.map((note, index) => (
            <div key={index} className="note">
              <p>{note.description}</p>
            </div>
          ))
        ) : (
          ""
        )}
      </h1>

      <div className="row justify-content-center">
        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow h-100 d-flex flex-column">
            <div className="card-body">
              <img src={`${process.env.PUBLIC_URL}/Aniket Photo.png`} className="profile-img" alt="Profile" />
              <h3 className="card-title">Aniket Chaudhari</h3>
              <p className="text-muted">Full-Stack Developer</p>
              <p>Building AI-powered web applications.</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="col-md-4">
          <div className="card shadow h-100 d-flex flex-column">
            <div className="card-body">
              <h5 className="card-title">Tech Stack</h5>
              <div className="d-flex flex-wrap gap-2">
                {["Python", "React", "Node.js", "Django", "MySQL", "Java"].map((tech) => (
                  <span key={tech} className="badge bg-primary">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {/* <div className="col-md-10 mt-4">
          <div className="card shadow h-100 d-flex flex-column">
            <div className="card-body">
              <h5 className="card-title">Projects</h5>
              <ul className="list-group">
                <li className="list-group-item">Quickart (E-Commerce Platform)</li>
                <li className="list-group-item">AI-Based Police FIR Assistant</li>
                <li className="list-group-item">MySQL Chat Application</li>
              </ul>
            </div>
          </div>
        </div> */}
        <div className="center-container">
          <div className="projects-container">
            <h2 className="mb-4">Projects</h2>
            <div className="row g-4 justify-content-center">
              {projects.map((project, index) => (
                <div key={index} className="col-md-10">
                  <div className="card-project shadow h-100">
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p className="text-muted">{project.duration}</p>
                      <p>{project.description}</p>
                      <h6>Tech Stack:</h6>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="badge bg-primary">{tech}</span>
                        ))}
                      </div>
                      <h6 className="mt-3">Impact:</h6>
                      <ul className="list-group">
                        {project.impact.map((point, i) => (
                          <li key={i} className="list-group-item">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="col-md-10 mt-4">
          <div className="card shadow h-100 d-flex flex-column text-center">
            <div className="card-body">
              <h5 className="card-title mb-4">Contact</h5>

              {/* Email */}
              <a href="mailto:chaudharianiket379@gmail.com" className="icon-link" title="Email">
                <i className="bi bi-envelope-fill text-primary"></i>
              </a>

              {/* GitHub */}
              <a href="https://github.com/Aniket12xfe" className="icon-link" title="GitHub" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github text-dark"></i>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/aniket-chaudhari-3b8937229/" className="icon-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin text-primary"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutMeDashboard;
