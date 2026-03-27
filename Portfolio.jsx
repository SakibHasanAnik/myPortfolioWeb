// ============================================================
// SAKIB HASAN ANIK — Portfolio React Component
// Usage: Drop into any React project. Requires Tailwind or
// link the style.css from the same portfolio package.
// ============================================================

import { useState, useEffect, useRef } from "react";

// ── DATA ────────────────────────────────────────────────────
const ROLES = ["AI & ML Researcher", "Data Science Enthusiast", "CSE Student", "Problem Solver"];

const ACADEMIC = [
  { degree: "B.Sc. in CSE", institution: "Northern University of Business & Technology, Khulna (NUBTK)", group: "Computer Science & Engineering", result: "CGPA 3.95", year: "2023 — 2027", status: "Ongoing (3rd Year)", badgeColor: "green" },
  { degree: "HSC", institution: "Govt. M.M. City College, Khulna", group: "Science", result: "GPA 5.00", year: "—", status: "Completed", badgeColor: "purple" },
  { degree: "SSC", institution: "St. Joseph's High School, Khulna", group: "Science", result: "GPA 5.00", year: "—", status: "Completed", badgeColor: "purple" },
];

const ACHIEVEMENTS = [
  { icon: "🏆", type: "Achievement", title: "Intra University Programming Contest — Champion Team", issuer: "NUBTK Programming Contest 2025" },
  { icon: "🎉", type: "Certificate", title: "Applied Data Science with Python", issuer: "Simplilearn" },
  { icon: "🤖", type: "Certificate", title: "Fundamentals of AI Concepts", issuer: "Microsoft" },
  { icon: "📈", type: "Certificate", title: "Business Analytics with MS Excel", issuer: "Simplilearn" },
  { icon: "🧠", type: "Certificate", title: "Prompt Engineering", issuer: "Simplilearn" },
];

const SKILLS = [
  {
    category: "Languages",
    items: [{ name: "Python", pct: 90 }, { name: "C / C++", pct: 90 }, { name: "Java", pct: 60 }],
  },
  {
    category: "AI / ML Frameworks",
    items: [
      { name: "NumPy & Pandas", pct: 88 },
      { name: "Matplotlib / Seaborn / Plotly", pct: 88 },
      { name: "Scikit-learn", pct: 85 },
      { name: "TensorFlow", pct: 80 },
    ],
  },
  {
    category: "Tools & Other",
    items: [{ name: "SQL", pct: 90 }, { name: "Git & GitHub", pct: 80 }, { name: "Agile", pct: 70 }, { name: "Linux", pct: 60 }],
  },
];

// ── HOOKS ────────────────────────────────────────────────────
function useTyping(words, typingSpeed = 80, deletingSpeed = 50, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setWordIdx((wordIdx + 1) % words.length); }
      }
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── SUB COMPONENTS ───────────────────────────────────────────
function SectionHeader({ num, title }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`section-header reveal ${visible ? "visible" : ""}`}>
      <span className="section-num">{num}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line"></div>
    </div>
  );
}

function SkillBar({ name, pct, animate }) {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: animate ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

function AchievementCard({ icon, type, title, issuer }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`achievement-card reveal ${visible ? "visible" : ""}`}>
      <div className="achievement-icon">{icon}</div>
      <div className="achievement-body">
        <div className="achievement-type">{type}</div>
        <div className="achievement-title">{title}</div>
        <div className="achievement-issuer">{issuer}</div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────
export default function Portfolio() {
  const typed = useTyping(ROLES);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [skillsRef, skillsVisible] = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-carousel
  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  const navLinks = [
    { href: "#about", num: "01.", label: "about" },
    { href: "#experience", num: "02.", label: "experience" },
    { href: "#academic", num: "03.", label: "academic" },
    { href: "#projects", num: "04.", label: "projects" },
    { href: "#achievements", num: "05.", label: "achievements" },
    { href: "#skills", num: "06.", label: "skills" },
    { href: "#contact", num: "07.", label: "contact" },
  ];

  return (
    <>
      {/* Orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* NAV */}
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">anik<span>.dev</span></a>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map(({ href, num, label }) => (
            <li key={href}>
              <a href={href} onClick={() => setMenuOpen(false)}>
                <span className="num">{num} </span>{label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "" }} />
        </div>
      </nav>

      {/* HERO */}
      <div id="hero-wrapper">
        <div id="hero">
          <div className="hero-greeting">Hi, my name is</div>
          <h1 className="hero-name"><strong>Sakib Hasan Anik.</strong></h1>
          <div className="hero-role">
            <span className="typed-text">{typed}</span>
            <span className="cursor-blink" />
          </div>
          <p className="hero-desc">
            I'm a CSE student at Northern University of Business &amp; Technology, Khulna,
            specialising in Artificial Intelligence, Machine Learning, and Data Science.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">▸ view my work</a>
            <a href="#resume" className="btn btn-resume">↓ download resume</a>
            <a href="#contact" className="btn btn-secondary">get in touch</a>
          </div>
        </div>
        <div className="hero-photo">
          <div className="hero-photo-frame">
            {/* Replace "photo.jpeg" with your image filename */}
            <img src="photo.jpeg" alt="Sakib Hasan Anik" className="hero-photo-img" />
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section">
        <SectionHeader num="01." title="About Me" />
        <div className="about-grid">
          <div className="about-text reveal visible">
            <p>I am <span className="accent">Anik</span>, a Computer Science student with strong critical thinking and problem-solving abilities. I have solid knowledge of Data Science, AI, ML, OOP, Data Structures, DBMS, OS, and Computer Networking.</p>
            <p>I am skilled in communication, teamwork, and management. Known for being dedicated and punctual.</p>
            <p>Interested in academic research in <span className="accent">AI, ML, and Data Science</span>. IELTS: <span className="accent">7.0</span>.</p>
          </div>
          <div className="about-stats reveal visible">
            {[["7.0","IELTS Score"],["AI","Research Focus"],["3.95","CGPA"],["5+","Certifications"]].map(([n,d]) => (
              <div key={d} className="stat-box">
                <div className="stat-num">{n}</div>
                <div className="stat-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC */}
      <section id="academic" className="section">
        <SectionHeader num="03." title="Academic Qualifications" />
        <div className="academic-table-wrapper reveal visible">
          <table className="academic-table">
            <thead>
              <tr>
                {["Degree / Exam","Institution","Group","Result","Year","Status"].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {ACADEMIC.map((row) => (
                <tr key={row.degree}>
                  <td><span className="degree-name">{row.degree}</span></td>
                  <td>{row.institution}</td>
                  <td>{row.group}</td>
                  <td><span className={`badge badge-${row.badgeColor}`}>{row.result}</span></td>
                  <td>{row.year}</td>
                  <td><span className={`badge badge-${row.badgeColor}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="section">
        <SectionHeader num="05." title="Achievements & Certifications" />
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((a) => <AchievementCard key={a.title} {...a} />)}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <SectionHeader num="06." title="Skills" />
        <div ref={skillsRef} className={`skills-grid reveal ${skillsVisible ? "visible" : ""}`}>
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="skill-category">
              <div className="skill-cat-title">{category}</div>
              <div className="skill-list">
                {items.map((s) => <SkillBar key={s.name} {...s} animate={skillsVisible} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="section">
        <SectionHeader num="06b." title="Resume" />
        <div className="resume-section-inner reveal visible">
          <div className="resume-icon">📄</div>
          <h3 className="resume-title">Download My Resume</h3>
          <p className="resume-desc">Get a detailed overview of my education, skills, experience and achievements. Available as PDF — last updated March 2026.</p>
          {/* Replace # with your resume link */}
          <a href="#" className="btn btn-resume" download>↓ Download Resume (PDF)</a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <SectionHeader num="07." title="Get In Touch" />
        <div className="contact-wrap reveal visible">
          <div className="contact-left">
            <p>I'm currently open to internship and research collaboration opportunities. My inbox is always open!</p>
            <div className="contact-links">
              {[
                { href: "mailto:sakibhasananik37@gmail.com", icon: "@", label: "Email", value: "sakibhasananik37@gmail.com" },
                { href: "https://github.com/SakibHasanAnik", icon: "gh", label: "GitHub", value: "github.com/SakibHasanAnik" },
                { href: "https://www.linkedin.com/in/sakib-h-anik-7468a0344", icon: "in", label: "LinkedIn", value: "linkedin.com/in/sakib-h-anik" },
              ].map(({ href, icon, label, value }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-icon">{icon}</div>
                  <div>
                    <div className="contact-link-label">{label}</div>
                    <div className="contact-link-value">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="terminal">
            <div className="terminal-bar">
              <div className="terminal-dot red"/><div className="terminal-dot yellow"/><div className="terminal-dot green"/>
            </div>
            <div className="terminal-body">
              {[
                <><span className="t-comment"># profile.json</span></>,
                <>{`{`}</>,
                <>&nbsp;&nbsp;<span className="t-val">"name"</span>: <span className="t-str">"Sakib Hasan Anik"</span>,</>,
                <>&nbsp;&nbsp;<span className="t-val">"cgpa"</span>: <span className="t-str">3.95</span>,</>,
                <>&nbsp;&nbsp;<span className="t-val">"ielts"</span>: <span className="t-str">7.0</span>,</>,
                <>&nbsp;&nbsp;<span className="t-val">"available"</span>: <span className="t-cmd">true</span></>,
                <>{`}`}</>,
              ].map((line, i) => <div key={i} className="t-line">{line}</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-copy">© 2026 <span>Sakib Hasan Anik</span>. Designed & Built by Anik.</span>
        <span className="footer-back" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>back to top ↑</span>
      </footer>
    </>
  );
}
