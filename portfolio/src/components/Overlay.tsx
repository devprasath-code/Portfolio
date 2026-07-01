import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import {
  Cpu,
  Code2,
  BrainCircuit,
  Globe,
  Mail,
  Github,
  Linkedin,
  Zap,
  Layers,
  Terminal,
  Database,
  Rocket,
  Lightbulb,
  Bot,
  GraduationCap,
  Loader2
} from 'lucide-react';

const Section = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section
    id={id}
    className={cn(
      "min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 py-20 relative",
      className
    )}
  >
    {children}
  </section>
);

export function Overlay() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          // We pull the API access key directly from your .env file
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY",
          subject: "New Signal from Portfolio",
          from_name: formState.name || "Portfolio Terminal",
          ...formState
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to send signal. Please try again.');
      }
    } catch (error) {
      console.error('Error sending signal:', error);
      alert('A glitch occurred in the transmission. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const [typedText, setTypedText] = useState('');
  const fullText = "INITIALIZING SECURE TERMINAL... READY FOR TRANSMISSION.";

  useEffect(() => {
    if (fullText) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="w-full font-sans text-[#EAEAEA]">
      {/* Hero Section */}
      <Section id="hero" className="items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl w-full"
        >
          <motion.h2
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 0.6, letterSpacing: "0.5em" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-mono text-xs md:text-sm uppercase text-[#4DA6FF] mb-6"
          >
            Initializing Protocol
          </motion.h2>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6 text-glow">
            THE FUTURE IS<br />BUILT WITH AI
          </h1>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-40 mb-12">
            AI & Data Science Engineer | Generative AI | Data Analytics
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#EAEAEA", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('about')}
              className="px-8 py-4 border border-[#4DA6FF]/30 text-[#4DA6FF] font-serif tracking-widest uppercase text-sm transition-all portal-glow"
            >
              Enter Portfolio
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects')}
              className="px-8 py-4 border border-white/10 text-white font-serif tracking-widest uppercase text-sm transition-all"
            >
              View Projects
            </motion.button>
          </div>
        </motion.div>
      </Section>

      {/* About Section */}
      <Section id="about" className="relative">
        {/* AI Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4DA6FF_1px,transparent_1px),linear-gradient(to_bottom,#4DA6FF_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative aspect-[3/4] glass p-4 group"
          >
            <div className="w-full h-full bg-[#0E0E0E] relative overflow-hidden flex items-center justify-center">
              <img
                src="/assets/dev-prasad.png"
                alt="Dev Prasath L"
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#4DA6FF]/10 to-transparent" />
            </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#4DA6FF]/30 p-1 mb-8 relative group flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-[#4DA6FF]/20 animate-pulse" />
              <Cpu className="w-10 h-10 text-[#4DA6FF] opacity-50" />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 text-glow uppercase tracking-widest">A Digital Chamber</h2>
            <div className="space-y-6">
              {[
                "I'm Dev Prasath, an AI & Data Science engineer passionate about building intelligent systems that turn ideas into reality.",
                "I explore Machine Learning, Deep Learning, and NLP to create technology that learns, adapts, and evolves.",
                "Blending engineering precision with creative vision, I focus on designing impactful digital experiences rather than just writing code.",
                "My ambition is to become an AI Innovator and Tech Founder shaping the future of intelligent technology.",
                "I don't wait for the future — I build it."
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 1, delay: i * 0.3 }}
                  className="text-lg md:text-xl font-light leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <h2 className="font-serif text-3xl md:text-5xl mb-12 md:mb-16 text-center text-glow uppercase tracking-widest">Skills Control Room</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {[
            {
              icon: Cpu,
              title: "AI & Data Science",
              skills: ["ML", "DL", "NLP", "Computer Vision"],
              desc: "Architecting deep learning models and neural networks."
            },
            {
              icon: Terminal,
              title: "Programming",
              skills: ["Python", "Java", "HTML", "C"],
              desc: "Writing efficient code across multiple languages."
            },
            {
              icon: Layers,
              title: "Frameworks",
              skills: ["TensorFlow", "PyTorch", "React", "Supabase", "Power BI", "Tableau"],
              desc: "Leveraging powerful tools for AI and Web development."
            },
            {
              icon: BrainCircuit,
              title: "Engineering",
              skills: ["UI Design", "AI Automation", "n8n Workflow", "Full Stack"],
              desc: "Building end-to-end intelligent solutions."
            }
          ].map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 flex flex-col group hover:bg-[#4DA6FF]/5 transition-all duration-500 border-[#4DA6FF]/10 hover:border-[#4DA6FF]/30"
            >
              <div className="flex items-center gap-4 mb-6">
                <category.icon className="w-10 h-10 text-[#4DA6FF] opacity-50 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-serif text-xl tracking-wider">{category.title}</h3>
              </div>
              <p className="text-sm opacity-50 mb-6 leading-relaxed">{category.desc}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <span key={j} className="font-mono text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full opacity-60 group-hover:opacity-100 transition-opacity">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <h2 className="font-serif text-3xl md:text-5xl mb-12 md:mb-16 text-glow uppercase tracking-widest">AI Projects Lab</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full">
          {[
            {
              title: "AI EdTech",
              problem: "Student course providing platform with personal AI performance analyser.",
              tech: ["Python", "Firebase Auth", "AI Analytics"],
              image: "/assets/project_edtech.png"
            },
            {
              title: "AI Startup Validator",
              problem: "Validating startup ideas using Next.js, React, AWS (Fast API), and PostgreSQL.",
              tech: ["Next.js", "React", "AWS", "PostgreSQL"],
              image: "/assets/project_validator.png"
            },
            {
              title: "Aura",
              problem: "Real-time music player and listener platform.",
              tech: ["React", "Web Audio API", "Realtime"],
              image: "/assets/project_music.png"
            },
            {
              title: "AI Mental Health Analyser",
              problem: "24/7 AI human companion for mental health analysis.",
              tech: ["NLP", "Python", "Emotional AI"],
              image: "/assets/project_mental_health.png"
            }
          ].map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onClick={() => scrollTo('contact')}
              className="group relative overflow-hidden glass border-[#4DA6FF]/10 hover:border-[#4DA6FF]/40 transition-all duration-500 cursor-pointer perspective-1000"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-60 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-6 py-2 border border-[#4DA6FF] text-[#4DA6FF] font-mono text-xs uppercase tracking-widest backdrop-blur-md">
                    Initialize Portal
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-[#4DA6FF] tracking-tight mb-4">{project.title}</h3>
                <p className="text-sm opacity-50 mb-6 leading-relaxed">{project.problem}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span key={j} className="font-mono text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded uppercase tracking-tighter text-[#4DA6FF]/80">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Entrepreneurship Section */}
      <Section id="vision">
        <div className="max-w-4xl w-full text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-12 text-glow">THE VISION CHAMBER</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Innovation Philosophy", desc: "Thinking beyond code to build products that redefine human-AI interaction." },
              { icon: Rocket, title: "SaaS Exploration", desc: "Developing scalable AI-driven software solutions for global markets." },
              { icon: Bot, title: "Future AI Startup", desc: "Envisioning a startup that bridges the gap between complex AI and everyday utility." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass p-8 group hover:border-[#4DA6FF]/50 transition-all"
              >
                <item.icon className="w-10 h-10 mx-auto mb-6 text-[#4DA6FF] opacity-50 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-serif text-xl mb-4">{item.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience & Education Section */}
      <Section id="evolution">
        <h2 className="font-serif text-3xl md:text-5xl mb-12 md:mb-16 text-glow uppercase tracking-widest">The Evolution Wall</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
          <div className="space-y-8">
            <h3 className="font-serif text-2xl flex items-center gap-3 text-[#4DA6FF] tracking-widest">
              <GraduationCap className="w-6 h-6" /> ACADEMIC CORE
            </h3>
            <div className="glass p-8 border-l-4 border-[#4DA6FF] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <GraduationCap className="w-24 h-24" />
              </div>
              <p className="font-mono text-xs text-[#4DA6FF] mb-2 tracking-widest">2024 — 2028</p>
              <h4 className="font-serif text-2xl mb-2 tracking-tight">B.Tech Artificial Intelligence & Data Science</h4>
              <p className="text-sm opacity-60 uppercase tracking-[0.2em] mb-4">Tagore Engineering College</p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-[#4DA6FF]/10 border border-[#4DA6FF]/20 rounded-lg">
                  <p className="font-mono text-[10px] opacity-40 uppercase mb-1">Current Standing</p>
                  <p className="text-xl font-bold text-[#4DA6FF]">CGPA: 8.5</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="font-serif text-2xl flex items-center gap-3 text-[#4DA6FF] tracking-widest">
              <Rocket className="w-6 h-6" /> MILESTONES
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {[
                { year: "2024", title: "Inception", desc: "Began AI & Data Science journey at Tagore Engineering College." },
                { year: "2025", title: "Automation Phase", desc: "Building AI Projects & complex n8n automation workflows." },
                { year: "2026", title: "Advanced Systems", desc: "Specializing in Deep Learning and Computer Vision architectures." },
                { year: "Future", title: "Entrepreneurship", desc: "Launching AI-first SaaS products for the global market." }
              ].map((m, i) => (
                <div key={i} className="flex gap-8 items-start relative">
                  <div className="w-4 h-4 rounded-full bg-black border-2 border-[#4DA6FF] z-10 mt-1 portal-glow shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-[#4DA6FF] tracking-widest">{m.year}</span>
                      <span className="h-[1px] w-4 bg-white/10" />
                      <span className="font-serif text-sm uppercase tracking-wider">{m.title}</span>
                    </div>
                    <p className="text-sm opacity-60 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Tech Stack Visualization */}
      <Section id="tech-stack">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="text-left">
              <p className="font-mono text-[10px] text-[#4DA6FF] tracking-[0.5em] uppercase mb-2">Core Stack</p>
              <h2 className="font-serif text-3xl md:text-5xl text-glow uppercase tracking-widest">System Infrastructure</h2>
            </div>
            <div className="font-mono text-[10px] opacity-30 uppercase tracking-widest hidden md:block">
              Architecture Protocol v2.5 // Stable
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {[
              { icon: BrainCircuit, label: "Next.js", category: "Frontend" },
              { icon: Zap, label: "n8n", category: "Automation" },
              { icon: Code2, label: "React", category: "Library" },
              { icon: Globe, label: "Firebase", category: "Backend" },
              { icon: Rocket, label: "AWS", category: "Cloud" },
              { icon: Bot, label: "Gemini", category: "AI Model" },
              { icon: Database, label: "PostgreSQL", category: "Database" },
              { icon: Terminal, label: "Python", category: "Core" },
              { icon: Layers, label: "FastAPI", category: "API" },
              { icon: Cpu, label: "TensorFlow", category: "ML" },
              { icon: BrainCircuit, label: "PyTorch", category: "DL" },
              { icon: Globe, label: "Supabase", category: "BaaS" }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-black p-8 group hover:bg-[#4DA6FF]/5 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4DA6FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <tech.icon className="w-8 h-8 text-[#4DA6FF] mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <p className="font-mono text-[9px] text-[#4DA6FF] tracking-widest uppercase mb-1 opacity-50">{tech.category}</p>
                <h3 className="font-serif text-lg tracking-wider group-hover:text-white transition-colors">{tech.label}</h3>
                <div className="absolute bottom-4 right-4 font-mono text-[8px] opacity-10 group-hover:opacity-30">0{i + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-4xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <h2 className="font-serif text-5xl md:text-8xl mb-8 tracking-tighter text-glow uppercase">Contact Terminal</h2>
            <p className="font-mono text-xs text-[#4DA6FF] mb-8 opacity-60 tracking-widest h-4">
              {typedText}
            </p>
            <p className="text-lg md:text-xl font-light opacity-50 mb-12 max-w-2xl mx-auto">
              Ready to construct the future? Send a signal through the void.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {[
                { icon: Mail, label: "Email", href: "mailto:devprasathloganathan@gmail.com" },
                { icon: Github, label: "GitHub", href: "https://github.com/DevPrasath-L" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/dev-prasath-l/" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, opacity: 1, color: '#4DA6FF' }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-5 glass rounded-full opacity-40 group-hover:opacity-100 transition-all border-[#4DA6FF]/10 group-hover:border-[#4DA6FF]/50 portal-glow">
                    <social.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 text-center max-w-2xl mx-auto border-[#4DA6FF]/30"
            >
              <Bot className="w-16 h-16 text-[#4DA6FF] mx-auto mb-6 animate-pulse" />
              <h3 className="font-serif text-3xl mb-4 text-[#4DA6FF] tracking-widest">SIGNAL RECEIVED</h3>
              <p className="opacity-70 mb-8 font-mono text-sm">Your transmission has been successfully logged in the central intelligence core.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 border border-[#4DA6FF]/50 text-[#4DA6FF] font-mono text-xs uppercase tracking-widest hover:bg-[#4DA6FF]/10 transition-all"
              >
                Send Another Signal
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 text-left max-w-2xl mx-auto border-[#4DA6FF]/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4DA6FF]/50 to-transparent" />
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="font-mono text-[10px] uppercase text-[#4DA6FF] opacity-40 tracking-widest">Identity_ID</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:border-[#4DA6FF] outline-none transition-colors text-sm md:text-base font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-[10px] uppercase text-[#4DA6FF] opacity-40 tracking-widest">Signal_Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:border-[#4DA6FF] outline-none transition-colors text-sm md:text-base font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-[10px] uppercase text-[#4DA6FF] opacity-40 tracking-widest">Transmission_Data</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your vision..."
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:border-[#4DA6FF] outline-none transition-colors resize-none text-sm md:text-base font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-5 bg-[#4DA6FF] text-black font-serif uppercase tracking-[0.3em] text-sm hover:bg-[#EAEAEA] transition-colors portal-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    "Transmit Signal"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="font-mono text-[10px] opacity-30 uppercase tracking-[0.5em]">
          © 2026 DEV PRASATH L // AI ARCHITECT // CHENNAI, INDIA
        </p>
      </footer>
    </div>
  );
}
