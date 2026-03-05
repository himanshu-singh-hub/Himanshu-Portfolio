import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink, Trophy, Briefcase, GraduationCap, Code, Mail, Phone, MapPin, Linkedin, Download, Zap, Users, Clock } from 'lucide-react';
import { AnimatedCounter } from './components/AnimatedCounter';

interface EducationItem {
  degree: string;
  institution: string;
  dates: string;
  activities?: string;
  skills?: string[];
}

const DATA = {
  basics: {
    name: "Himanshu Singh",
    initials: "HS",
    title: "Full Stack Developer",
    subtitle: "C# .NET | ASP.NET Core | JavaScript | SQL",
    summary: "Results-driven Full Stack Developer with 3.5+ years of experience building scalable enterprise solutions using C# .NET, RESTful APIs, and microservices. Proven track record of enhancing UX by 40%, reducing API response times by 40–60%, and delivering production-grade systems across ERP, fintech, and travel domains.",
    location: "Agra, Uttar Pradesh, India",
    email: "Himanshurajagra@gmail.com",
    phone: "+91 94578 75269",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/himanshu-singh-dev", icon: <Linkedin size={18} /> }
    ]
  },
  skills: [
    { category: "Backend", items: ["C#", "VB.NET", "ASP.NET Core (8, 10)", "ASP.NET MVC", "SignalR", "RESTful APIs", "Microservices"] },
    { category: "Frontend", items: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Responsive UI Design"] },
    { category: "Databases", items: ["PostgreSQL", "SQL Server", "Output Caching", "SSMS", "Query Optimization"] },
    { category: "Tools", items: ["Git", "Postman", "Visual Studio(22,26)", "VS Code", "Grafana", "Loki", "JMeter"] },
    { category: "Practices", items: ["Agile/Scrum", "SDLC", "Unit Testing", "Code Review", "RBAC"] }
  ],
  experience: [
    {
      company: "Eudemonic Technologies Private Limited",
      role: "Software Developer",
      type: "Full-time",
      location: "Gurugram, Haryana, India (On-site)",
      dates: "Aug 2025 – Feb 2026",
      bullets: [
        "Built HVAC ERP with ASP.NET Core; implemented microservices & output caching — API response time ↓40%, DB queries ↓60%",
        "Configured Grafana Loki logging for real-time monitoring and faster issue resolution"
      ],
      impact: ["API response time ↓40%", "DB queries ↓60%"],
      skills: ["ASP.NET Core 10", "Angular", "Grafana", "Loki", "Promtail", "Serilog", "Software Infrastructure"]
    },
    {
      company: "eBizneeds Business Solutions",
      role: "Software Developer",
      type: "Full-time",
      dates: "Oct 2024 – Aug 2025",
      bullets: [
        "Developed full-stack cruise booking platform (ASP.NET MVC) with advanced search & real-time booking — API performance optimized 40%"
      ],
      impact: ["Performance ↑40%"],
      skills: [".NET Framework", ".NET Core", "HangFire", "Dapper", "ORM", "MS SQL Server", "SQL"]
    },
    {
      company: "eBizneeds Business Solutions",
      role: "Junior Software Developer",
      type: "Full-time",
      location: "Jaipur, Rajasthan, India (On-site)",
      dates: "Sep 2023 – Sep 2024",
      bullets: [
        "Built claim tracking APIs (ASP.NET Core 8) with SignalR chat; enhanced Sharekhan site with custom SIP/EMI/Tax calculators"
      ],
      skills: ["Dot net core 8", "Signal R", "NLog", "SonarQube", "Python", "Postman API", "HTML", "CSS", "Bootstrap"]
    },
    {
      company: "Idiary IT Solution",
      role: "Software Developer Trainee",
      type: "Full-time",
      location: "Agra, Uttar pradesh, India (On-site)",
      dates: "Aug 2022 – Sep 2023",
      bullets: [
        "Designed multi-tenant ERP for 20+ educational institutions using ASP.NET, C#, VB.NET, and SQL Server",
        "Built responsive frontend interfaces using HTML5, CSS3, JavaScript, and Bootstrap for student and admin portals",
        "Automated gate pass & library systems, cutting manual processing by 60%; optimized queries improving performance by 35%"
      ],
      impact: ["Manual processing ↓60%", "Performance ↑35%"],
      skills: ["Asp.net Web form", "RDLC", "VB.net", "MS SQL Server", "SQL", "HTML", "CSS", "Bootstrap"]
    }
  ],
  projects: [
    {
      title: "AirMaster HVAC ERP",
      stack: "ASP.NET Core 10, C#, MS SQL Server, Distributed Caching, Serilog, Grafana, Loki",
      dates: "Aug 2025 – Feb 2026",
      association: "Eudemonic Technologies Private Limited",
      bullets: [
        "Developed a comprehensive HVAC ERP system to manage customers, locations, quotes, and service records.",
        "Designed and implemented RESTful APIs using ASP.NET Core for scalable backend services.",
        "Implemented Output Caching to reduce repetitive database calls and improve response time for high-frequency endpoints.",
        "Integrated Grafana Loki logging for centralized log monitoring and faster incident resolution.",
        "Implemented Role-Based Access Control (RBAC) for secure access to ERP modules."
      ]
    },
    {
      title: "Australian Cruise Group Booking Platform",
      stack: "ASP.NET MVC, C#, HTML5, CSS, MS SQL Server, SQL",
      dates: "Apr 2025 – Aug 2025",
      association: "eBizneeds",
      bullets: [
        "Developed a full-stack cruise booking platform with advanced search filters and cabin selection.",
        "Built responsive user interfaces using Bootstrap, HTML5, CSS3, and JavaScript for improved cross-device compatibility.",
        "Designed optimized SQL queries and indexing strategies to efficiently manage large cruise inventory datasets.",
        "Improved platform performance and reduced page load time by 35% through query and UI optimization."
      ]
    },
    {
      title: "JNJ Services Contractor Management System",
      stack: "ASP.NET Core 8, SignalR, NLog, MS SQL Server, SQL",
      dates: "Feb 2024 – Mar 2025",
      association: "eBizneeds",
      bullets: [
        "Developed a contractor management system for an insurance company to track assignments, workflows, and audit trails.",
        "Built scalable RESTful APIs using ASP.NET Core 8 to support contractor and reservation management.",
        "Integrated SignalR with a React.js frontend to enable real-time communication between admin and users.",
        "Implemented reusable API middleware for authentication, logging, and error handling across service endpoints."
      ]
    },
    {
      title: "Sharekhan landing Page",
      stack: "ASP.NET MVC, JavaScript, HTML5, CSS",
      dates: "Sep 2023 – Feb 2024",
      association: "eBizneeds",
      bullets: [
        "Developed custom SIP, EMI, and Tax calculators to enhance financial planning tools on the Sharekhan platform.",
        "Implemented responsive UI components using HTML5, CSS3, and JavaScript.",
        "Optimized calculation logic and SQL queries to improve response time by around 40%.",
        "Enhanced frontend interactivity using modern JavaScript features and CSS animations."
      ]
    },
    {
      title: "School Management ERP",
      stack: "C#, Microsoft SQL Server, SQL, Asp.net web forms, RDL, VB.net",
      dates: "Aug 2022 – Sep 2023",
      association: "Idiary IT Solution",
      bullets: [
        "Developed a multi-tenant ERP system for managing student enrollment, attendance, fees, and academic records.",
        "Supported 20+ educational institutions with shared infrastructure and isolated data architecture.",
        "Built responsive admin and student portals using HTML5, Bootstrap, and JavaScript.",
        "Automated gate pass and library systems, reducing manual administrative work by 60%.",
        "Optimized SQL queries to improve application performance by 35%."
      ]
    },
    {
      title: "Library Management System",
      stack: "Java, JavaServer Pages (JSP), java database Connectivity (JDBC), Netbeans Platform, MS SQL",
      dates: "Jan 2022 – Feb 2022",
      association: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
      bullets: [
        "Developed a web-based Library Management System to manage book records, student information, and issue/return operations.",
        "Built the backend using Java and JavaServer Pages (JSP) for handling server-side logic and application workflow.",
        "Designed responsive user interfaces using HTML, CSS, Bootstrap, and JavaScript for smooth usability across desktop, tablet, and mobile devices.",
        "Implemented Bootstrap-based responsive layout to ensure accessibility across multiple screen sizes.",
        "Used MS Access database with SQL queries for storing and managing library records.",
        "Developed features for book inventory management, issue/return tracking, and user record management."
      ]
    },
    {
      title: "Inventory Management System",
      stack: "Java, JavaServer Pages (JSP), Netbeans Platform, MS SQL",
      dates: "Aug 2021 – Oct 2021",
      association: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
      bullets: [
        "Developed a desktop-based Inventory Management System to manage product records, stock levels, and inventory transactions.",
        "Built the application using Java and Java AWT to create an interactive graphical user interface for inventory operations.",
        "Implemented backend functionality using Java APIs to handle data processing and business logic.",
        "Designed database storage using MySQL and MS Access for managing inventory data efficiently.",
        "Implemented core features including product entry, stock updates, inventory tracking, and data management.",
        "Strengthened problem-solving and debugging skills while designing and implementing the complete application."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology - BTech, Computer Engineering",
      institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
      dates: "Aug 2019 – Aug 2023",
      activities: "Play Volleyball"
    },
    {
      degree: "High School Education",
      institution: "AGRA VANASTHALI MAHAVIDYALAYA -Agra",
      dates: "May 2017 – Jun 2019"
    },
    {
      degree: "Junior High School Education",
      institution: "Gayatri Public School - Agra",
      dates: "Apr 2012 – May 2017",
      activities: "Basketball, VolleyBall"
    }
  ],
  achievements: [
    { title: "HackerRank Python Certification", date: "July 2022", type: "Certification" },
    { title: "Research Publication: \"Data Mining and Techniques\"", context: "National Conference, 2022", type: "Award" },
    { title: "CBSE National Basketball Championship Participant", type: "Leadership" },
    { title: "CBSE Zone Runner-up", type: "Leadership" }
  ]
};

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="mb-12 flex items-center gap-4"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
  </motion.div>
);

interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  impact?: string[];
}

const ExperienceCard: React.FC<{ exp: ExperienceItem, index: number }> = ({ exp, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative mb-6 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all hover:border-blue-500/30"
    >
      <div 
        className="flex cursor-pointer items-center justify-between p-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
              {exp.dates}
            </span>
            {exp.type && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                • {exp.type}
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
            <span className="font-medium text-zinc-300">{exp.company}</span>
            {exp.location && (
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <MapPin size={12} />
                {exp.location}
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-zinc-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 p-6 pt-0">
              {exp.skills && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400 ring-1 ring-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <ul className="mt-4 space-y-3">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/50" />
                    {bullet}
                  </li>
                ))}
              </ul>
              {exp.impact && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.impact.map((imp, i) => (
                    <span key={i} className="rounded-lg bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/20">
                      {imp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center px-6 pt-32 pb-12 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium tracking-widest text-blue-400 uppercase"
          >
            Available for New Opportunities
          </motion.div>
          <h1 className="mb-6 text-6xl font-extrabold tracking-tighter text-white md:text-8xl">
            {DATA.basics.name}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {DATA.basics.summary}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => scrollTo('experience')}
              className="no-print group flex items-center gap-2 rounded-full border border-transparent bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex shrink-0"
              >
                <ChevronDown size={18} />
              </motion.div>
              <span>View Experience</span>
            </button>
            <button 
              onClick={() => scrollTo('projects')}
              className="no-print flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              <div className="flex shrink-0">
                <Code size={18} />
              </div>
              <span>View Projects</span>
            </button>
          </div>
        </motion.div>

        {/* Impact Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 w-full max-w-5xl"
        >
          <div className="relative flex w-full flex-col items-center justify-around gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:flex-row md:gap-0">
            {/* Background Glows */}
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[80px]" />
            
            <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                <Clock size={24} />
              </div>
              <div>
                <div className="text-3xl font-black tracking-tighter text-white md:text-4xl">
                  <AnimatedCounter value={3.5} decimals={1} suffix="+" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Years Exp</div>
              </div>
            </div>

            <div className="hidden h-12 w-[1px] bg-white/10 md:block" />

            <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                <Users size={24} />
              </div>
              <div>
                <div className="text-3xl font-black tracking-tighter text-white md:text-4xl">
                  <AnimatedCounter value={40} suffix="%" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">API Performance Optimization</div>
              </div>
            </div>

            <div className="hidden h-12 w-[1px] bg-white/10 md:block" />

            <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
                <Zap size={24} />
              </div>
              <div>
                <div className="text-3xl font-black tracking-tighter text-white md:text-4xl">
                  <AnimatedCounter value={60} suffix="%" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Latency Reduction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-24">
        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <SectionHeader title="Experience" icon={Briefcase} />
          <div className="space-y-4">
            {DATA.experience.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-32">
          <SectionHeader title="Achievements" icon={Trophy} />
          <div className="grid gap-6 md:grid-cols-2">
            {DATA.achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-blue-500/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Trophy size={20} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{ach.title}</h3>
                {ach.context && <p className="text-sm text-zinc-400">{ach.context}</p>}
                {ach.date && <p className="mt-2 text-xs font-medium text-blue-400">{ach.date}</p>}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:bg-blue-500/10" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <SectionHeader title="Key Projects" icon={Code} />
          <div className="grid gap-8">
            {DATA.projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-blue-500/20"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold text-white">{proj.title}</h3>
                  <span className="text-sm font-medium text-zinc-500">{proj.dates}</span>
                </div>
                
                {proj.association && (
                  <div className="mb-6 flex items-center gap-2 text-xs font-medium text-blue-400/80">
                    <Briefcase size={14} />
                    <span>Associated with {proj.association}</span>
                  </div>
                )}

                <div className="mb-6 flex flex-wrap gap-2">
                  {proj.stack.split(',').map((s, idx) => (
                    <span key={idx} className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-400 ring-1 ring-white/10">
                      {s.trim()}
                    </span>
                  ))}
                </div>
                <ul className="space-y-3">
                  {proj.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                      <ExternalLink size={14} className="mt-1 shrink-0 text-blue-500/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-32">
          <SectionHeader title="Technical Arsenal" icon={Code} />
          <div className="grid gap-4 md:grid-cols-3">
            {DATA.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
              >
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-500">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-32">
          <SectionHeader title="Education" icon={GraduationCap} />
          <div className="space-y-6">
            {DATA.education.map((edu: EducationItem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-blue-500/20"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="mt-1 text-zinc-400">{edu.institution}</p>
                    
                    {edu.activities && (
                      <div className="mt-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Activities & Societies</span>
                        <p className="mt-1 text-sm text-zinc-500">{edu.activities}</p>
                      </div>
                    )}

                    {edu.skills && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {edu.skills.map((skill, idx) => (
                          <span key={idx} className="rounded-md bg-blue-500/5 px-2 py-1 text-[10px] font-medium text-blue-400 ring-1 ring-blue-500/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-4 py-1 text-sm font-bold text-blue-400 ring-1 ring-blue-500/20">
                    {edu.dates}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-white/[0.01] py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-8 text-4xl font-bold text-white">Let's Connect</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href={`mailto:${DATA.basics.email}`} className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-6 py-3 transition-all hover:bg-white/10">
              <Mail size={18} />
              {DATA.basics.email}
            </a>
            <a href={`tel:${DATA.basics.phone}`} className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-6 py-3 transition-all hover:bg-white/10">
              <Phone size={18} />
              {DATA.basics.phone}
            </a>
            <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-6 py-3">
              <MapPin size={18} />
              {DATA.basics.location}
            </div>
          </div>
          <div className="mt-12 flex justify-center gap-4">
            {DATA.basics.links.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white transition-all hover:bg-blue-600"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="mt-12 text-xs font-medium uppercase tracking-widest text-zinc-600">
            © {new Date().getFullYear()} {DATA.basics.name}. Built with Precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
