
import { useState } from "react";
import profilePhoto from "./assets/linkdin.jpeg";
import freshTrackImage from "./assets/freshtrack.png";
import geethumImage from "./assets/geethum.png";
import skillGapImage from "./assets/skill-gap.png";
import "./App.css";

const email = "ravimadhu827@gmail.com";
const github = "https://github.com/ravimadhu827-spec";
const linkedin =
  "https://www.linkedin.com/in/madhusri-ravikumar-m-r-2981ba316/";

const skills = [
  {
    title: "Frontend Development",
    icon: "✦",
    description: "Creating responsive and user-friendly interfaces.",
    items: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap"],
  },
  {
    title: "Backend Development",
    icon: "⌘",
    description: "Building application logic and REST APIs.",
    items: ["Core Java", "Spring Boot", "JDBC", "REST API"],
  },
  {
    title: "Database",
    icon: "▤",
    description: "Managing and storing application data.",
    items: ["MySQL"],
  },
  {
    title: "Tools & Technologies",
    icon: "⚙",
    description: "Tools used for development and testing.",
    items: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA"],
  },
];

const projects = [
  {
    number: "01",
    name: "FreshTrack",
    category: "Java Full Stack",
    description:
      "Smart Pantry Management and Food Waste Reduction System. Tracks grocery expiry dates and supports food donations.",
    technologies: ["React", "Java", "Spring Boot", "MySQL"],
    image: freshTrackImage,
    alt: "FreshTrack pantry management website screenshot",
  },
  {
    number: "02",
    name: "Geethum Food Manufacturing Website",
    category: "Web Development",
    description:
      "A responsive website for a food manufacturing business, showcasing products, manufacturing processes and quality information.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: geethumImage,
    alt: "Geethum Food Manufacturing website screenshot",
  },
  {
    number: "04",
    name: "Codathon Skill Gap Analyzer",
    category: "Codathon Project",
    description:
      "A web application designed to identify skill gaps and help users understand their learning requirements.",
    technologies: ["React", "JavaScript"],
    image: skillGapImage,
    alt: "Codathon Skill Gap Analyzer dashboard screenshot",
  },
  {
    number: "05",
    name: "Student-Course Microservices",
    category: "Practice Project",
    description:
      "A practice application demonstrating communication between Student and Course microservices using REST APIs.",
    technologies: ["Java", "Spring Boot", "REST API"],
    preview: "microservices",
  },
  {
    number: "06",
    name: "Student Management System",
    category: "Practice Project",
    description:
      "A practice application for managing student information and demonstrating basic CRUD operations.",
    technologies: ["Java", "Spring Boot", "MySQL"],
    preview: "students",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleContact = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.name.value.trim();
    const senderEmail = form.senderEmail.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`
    );

    window.location.href =
      `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div className="portfolio">
      <header className="header">
        <nav className="navbar">
          <a href="#home" className="logo" onClick={closeMenu}>
            Madhusri<span> M R</span>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            {["Home", "About", "Skills", "Projects", "Education", "Achievements", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="/Madhusri-Resume.pdf"
            download="Madhusri_Ravikumar_Resume.pdf"
            className="nav-button"
          >
            ↓ Resume
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="welcome-badge">
              <span className="green-dot"></span>
              WELCOME TO MY PORTFOLIO
            </div>

            <p className="hero-greeting">Hello, I'm</p>

            <h1>
              Madhusri
              <span> Ravikumar.</span>
            </h1>

            <h2>
              Java Full Stack <span>Developer</span>
            </h2>

            <p className="hero-description">
              I'm passionate about building beautiful and useful web
              applications. I enjoy working with Java, Spring Boot, React
              and MySQL to turn ideas into real-world digital solutions.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-button">
                Explore My Work ↗
              </a>
              <a href="#contact" className="secondary-button">
                Contact Me
              </a>
            </div>

            <div className="hero-social">
              <span>Find me on</span>
              <a href={github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="background-circle circle-one"></div>
            <div className="background-circle circle-two"></div>

            <div className="profile-card">
              <div className="profile-card-top">
                <span>✦ MY PROFILE</span>
                <span className="online-status"></span>
              </div>

              <div className="profile-photo-wrapper">
                <img
                  src={profilePhoto}
                  alt="Madhusri Ravikumar"
                  className="profile-photo"
                />
              </div>

              <h3>Madhusri Ravikumar</h3>
              <p className="profile-role">Java Full Stack Developer</p>

              <div className="profile-divider"></div>

              <div className="profile-details">
                <div>
                  <span>EDUCATION</span>
                  <strong>B.Sc Zoology</strong>
                </div>
                <div>
                  <span>LOCATION</span>
                  <strong>Chennai, India</strong>
                </div>
              </div>

              <div className="rank-badge">
                🏆 University Rank Holder
              </div>
            </div>

            <div className="floating-label label-java">☕ Java Developer</div>
            <div className="floating-label label-react">⚛ React Developer</div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <span className="section-label">01 — ABOUT ME</span>
            <h2>Get to know <span>me better.</span></h2>
            <p>A little introduction about myself and my journey.</p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <div className="card-icon">👋</div>
              <h3>My Journey</h3>

              <p>
                I'm Madhusri Ravikumar, a B.Sc Zoology graduate and
                Bharathidasan University Rank Holder with a passion for
                technology and software development.
              </p>

              <p>
                My learning journey includes frontend development using
                HTML, CSS, JavaScript and React.js, along with backend
                technologies like Core Java, Spring Boot and MySQL.
              </p>

              <p>
                I enjoy creating practical applications, solving problems
                and learning new technologies. My goal is to start my
                career as a Java Developer.
              </p>

              <a href="#contact" className="text-link">Let's connect ↗</a>
            </div>

            <div className="about-highlights">
              <div className="highlight-card">
                <span>🎓</span>
                <h3>2026</h3>
                <p>Graduation</p>
              </div>
              <div className="highlight-card">
                <span>🏆</span>
                <h3>Rank Holder</h3>
                <p>University Achievement</p>
              </div>
              <div className="highlight-card">
                <span>💻</span>
                <h3>Full Stack</h3>
                <p>Development Skills</p>
              </div>
              <div className="highlight-card">
                <span>🚀</span>
                <h3>Career Goal</h3>
                <p>Java Developer</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading">
            <span className="section-label">02 — TECHNICAL SKILLS</span>
            <h2>My technical <span>toolkit.</span></h2>
            <p>Technologies and tools I have learned and practiced.</p>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.title}>
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-tags">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading">
            <span className="section-label">03 — MY WORK</span>
            <h2>Featured <span>projects.</span></h2>
            <p>Practical applications from my development journey.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-top">
                  <span className="project-number">
                    {project.number} / {project.category}
                  </span>
                  <span className="project-arrow">↗</span>
                </div>

                {project.image ? (
                  <div className="project-image">
                    <img src={project.image} alt={project.alt} />
                  </div>
                ) : (
                  <div className={`project-preview ${project.preview}`}>
                    {project.preview === "microservices" ? (
                      <div className="microservice-ui">
                        <div className="preview-topbar">
                          <span>Student Service</span>
                          <span>Course Service</span>
                        </div>
                        <div className="service-flow">
                          <div className="service-box">
                            <span>👨‍🎓</span>
                            <strong>Student</strong>
                            <small>8085</small>
                          </div>
                          <span className="flow-arrow">⇄</span>
                          <div className="service-box">
                            <span>📚</span>
                            <strong>Course</strong>
                            <small>8086</small>
                          </div>
                        </div>
                        <div className="api-label">REST API • Gateway 8089</div>
                      </div>
                    ) : (
                      <div className="student-ui">
                        <div className="student-ui-title">Student Dashboard</div>
                        <div className="student-stats">
                          <div><strong>Students</strong><b>120</b></div>
                          <div><strong>Courses</strong><b>08</b></div>
                          <div><strong>Records</strong><b>Active</b></div>
                        </div>
                        <div className="student-table">
                          <span>Student Records</span>
                          <i></i><i></i><i></i>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section education-section" id="education">
          <div className="section-heading">
            <span className="section-label">04 — EDUCATION</span>
            <h2>My learning <span>journey.</span></h2>
            <p>My academic background and technical learning.</p>
          </div>

          <div className="education-timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date">2023 – 2026</span>
              <h3>Bachelor of Science – Zoology</h3>
              <p>MIT College of Arts and Science</p>
              <span className="education-achievement">
                🏆 Bharathidasan University Rank Holder
              </span>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date">Technical Learning</span>
              <h3>Java Full Stack Development</h3>
              <p>
                Core Java, Object-Oriented Programming, Spring Boot,
                React.js, MySQL and REST APIs.
              </p>
              <span className="education-achievement">
                Frontend • Backend • Database
              </span>
            </div>
          </div>
        </section>

        <section className="section achievements-section" id="achievements">
          <div className="section-heading">
            <span className="section-label">05 — ACHIEVEMENTS</span>
            <h2>Milestones I'm <span>proud of.</span></h2>
            <p>Achievements and certifications from my journey.</p>
          </div>

          <div className="achievement-grid">
            <div className="achievement-card">
              <span>🏆</span>
              <h3>University Rank Holder</h3>
              <p>Bharathidasan University – B.Sc Zoology.</p>
            </div>
            <div className="achievement-card">
              <span>💻</span>
              <h3>Codathon Winner</h3>
              <p>Recognized for the Codathon Skill Gap Analyzer project.</p>
            </div>
            <div className="achievement-card">
              <span>📜</span>
              <h3>Certifications</h3>
              <p>
                Computer Operating Automation and Typewriting English
                Lower – First Class with Distinction.
              </p>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-heading">
            <span className="section-label">06 — CONTACT</span>
            <h2>Let's connect <span>together.</span></h2>
            <p>Have an opportunity or a project in mind? Feel free to message me.</p>
          </div>

          <div className="contact-layout">
            <div className="contact-information">
              <a className="contact-detail" href={`mailto:${email}`}>
                <span className="contact-detail-icon">✉</span>
                <span className="contact-detail-text">
                  <small>Email</small>
                  <strong>{email}</strong>
                </span>
                <span className="contact-arrow">↗</span>
              </a>

              <a className="contact-detail" href="tel:+919345271282">
                <span className="contact-detail-icon">☎</span>
                <span className="contact-detail-text">
                  <small>Phone</small>
                  <strong>+91 93452 71282</strong>
                </span>
                <span className="contact-arrow">↗</span>
              </a>

              <a className="contact-detail" href={linkedin} target="_blank" rel="noreferrer">
                <span className="contact-detail-icon">in</span>
                <span className="contact-detail-text">
                  <small>LinkedIn</small>
                  <strong>Madhusri Ravikumar M R</strong>
                </span>
                <span className="contact-arrow">↗</span>
              </a>

              <a className="contact-detail" href={github} target="_blank" rel="noreferrer">
                <span className="contact-detail-icon">⌘</span>
                <span className="contact-detail-text">
                  <small>GitHub</small>
                  <strong>@ravimadhu827-spec</strong>
                </span>
                <span className="contact-arrow">↗</span>
              </a>

              <div className="contact-detail">
                <span className="contact-detail-icon">⌖</span>
                <span className="contact-detail-text">
                  <small>Location</small>
                  <strong>Chennai, Tamil Nadu, India</strong>
                </span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContact}>
              <h3>Send a message</h3>
              <p>I usually reply within 24 hours.</p>

              <div className="form-row">
                <label>
                  YOUR NAME
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  EMAIL ADDRESS
                  <input name="senderEmail" type="email" placeholder="your@email.com" required />
                </label>
              </div>

              <label>
                SUBJECT
                <input name="subject" type="text" placeholder="Your subject" required />
              </label>

              <label>
                MESSAGE
                <textarea name="message" rows="5" placeholder="Write your message..." required />
              </label>

              <button type="submit" className="primary-button send-button">
                Send message ↗
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">Madhusri<span>.dev</span></a>
        <p>Designed & Built by Madhusri Ravikumar © 2026</p>
        <div className="footer-social">
          <a href={github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
