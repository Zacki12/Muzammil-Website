import React from 'react';
import { Mail, ArrowRight, Shield, Code, Terminal, Server } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import BlogList from '../components/BlogList';
import CertificationList from '../components/CertificationList';
import ProjectList from '../components/ProjectList';
import Footer from '../components/Footer';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400 tracking-tighter">MI.</div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <Link href="#home" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="#skills" className="hover:text-cyan-400 transition-colors">Skills</Link>
            <Link href="#projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
            <Link href="#courses" className="hover:text-cyan-400 transition-colors">Courses</Link>
            <Link href="#blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
          </div>
          <Link href="/admin">
            <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded-md hover:bg-cyan-500 hover:text-slate-900 transition-all">
              Admin Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-sm font-mono mb-4">
            Access Granted
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Muzammil Idrees</h1>
          <h2 className="text-2xl md:text-3xl text-slate-400 font-light">IT Engineer & Cyber Security Specialist</h2>
          <p className="text-slate-400 max-w-lg leading-relaxed">Based in Kansas City. Bridging the gap between robust software engineering and advanced cybersecurity methodologies. Building secure, scalable, and modern digital infrastructure.</p>
          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 bg-cyan-500 text-slate-900 font-medium rounded-md hover:bg-cyan-400 transition-colors flex items-center gap-2">
              View Projects <ArrowRight size={18} />
            </button>
            <button className="px-6 py-3 bg-transparent border border-slate-700 text-white rounded-md hover:border-slate-500 transition-colors">Contact Me</button>
          </div>
          <div className="flex gap-6 pt-6 text-slate-400">
            <a href="https://github.com/Zacki12" className="hover:text-cyan-400 transition-colors"><FaGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/muzammil-idrees-748ba019b/" className="hover:text-cyan-400 transition-colors"><FaLinkedin size={24} /></a>
            <a href="mailto:muzfs1@gmail.com" className="hover:text-cyan-400 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
          <img src="/zack.jpg" alt="Muzammil Idrees" className="relative z-10 w-full max-w-md mx-auto rounded-2xl border border-slate-800 shadow-2xl shadow-cyan-500/10 object-cover" />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3"><Terminal className="text-cyan-400" /> Technical Arsenal</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Kali Linux', 'Wireshark', 'Nmap', 'Burp Suite', 'Autopsy', 'React.js', 'Next.js', 'Node.js', 'Tailwind CSS', 'Firebase'].map((skill) => (
              <div key={skill} className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/50 hover:bg-slate-800 transition-all group flex items-center justify-center">
                <span className="font-mono text-slate-300 group-hover:text-cyan-400 transition-colors">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Timeline + Certifications */}
      <section id="education" className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 flex items-center gap-3"><Code className="text-cyan-400" /> Academic Background & Certifications</h3>
        <div className="space-y-8 border-l-2 border-slate-800 ml-4 pl-8 relative">
          <div className="relative">
            <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-cyan-500 ring-4 ring-slate-950"></div>
            <h4 className="text-xl font-semibold">Master of Science in Cyber Security</h4>
            <p className="text-cyan-400 font-mono text-sm my-1">Avila University | 2024 - Present</p>
            <p className="text-slate-400 mt-2">Specializing in advanced threat detection, network security, and secure software development practices.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-slate-700 ring-4 ring-slate-950"></div>
            <h4 className="text-xl font-semibold">Bachelor of Science in Software Engineering</h4>
            <p className="text-slate-400 font-mono text-sm my-1">CECOS University | 2018 - 2022</p>
            <p className="text-slate-400 mt-2">Core foundation in software architecture, full-stack development, and database management.</p>
          </div>
        </div>
        <div className="mt-12">
          <h4 className="text-2xl font-bold mb-4">Certifications</h4>
          <CertificationList />
        </div>
      </section>

      {/* Projects Section (dynamic) */}
      <section id="projects" className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3"><Shield className="text-cyan-400" /> Featured Projects</h3>
          <ProjectList />
        </div>
      </section>

      {/* Courses LMS Section */}
      <section id="courses" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-3xl font-bold flex items-center gap-3 mb-2"><Server className="text-cyan-400" /> Training Modules</h3>
            <p className="text-slate-400">Premium cybersecurity and development courses.</p>
          </div>
          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1">Student Dashboard <ArrowRight size={16} /></button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded">PREMIUM</div>
            <div className="h-40 bg-slate-800 rounded-lg mb-4"></div>
            <h4 className="font-bold text-lg mb-1">Ethical Hacking Fundamentals</h4>
            <p className="text-sm text-slate-400 mb-4">Master the basics of penetration testing and vulnerability assessment.</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xl font-bold">$49.99</span>
              <button className="px-4 py-2 bg-white text-slate-900 text-sm font-bold rounded hover:bg-slate-200 transition-colors">Unlock Course</button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-3"><Code className="text-cyan-400" /> Security Briefings & Tech Logs</h3>
          <div className="max-w-7xl mx-auto px-6"><BlogList /></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}