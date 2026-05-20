import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact,
  SiPython, SiNodedotjs, SiGit, SiGithub,
  SiFigma, SiTailwindcss, SiNextdotjs, SiMysql
} from "react-icons/si";
import { Terminal, Code, Cpu, ExternalLink, Github, Twitter, Linkedin, Mail, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const navLinks = ["About", "Skills", "Projects", "Contact"];

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "SQL", icon: SiMysql, color: "#4479A1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "VS Code", icon: Code, color: "#007ACC" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const projects = [
  {
    title: "Neon Portfolio",
    description: "A dark, electric personal portfolio designed to stand out. Features smooth scroll, stagger animations, and glowing neon accents.",
    tags: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Atmosphere App",
    description: "A sleek weather dashboard providing real-time forecasting with animated weather icons and dynamic backgrounds based on conditions.",
    tags: ["React", "API Integration", "CSS Modules"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Flow Tasks",
    description: "A frictionless task manager for developers. Features keyboard shortcuts, markdown support, and local-first data storage.",
    tags: ["Next.js", "Zustand", "Lucide React"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Matrix Calc",
    description: "A beautiful, glassmorphic calculator with history tracking and advanced mathematical functions tailored for students.",
    tags: ["JavaScript", "HTML/CSS", "DOM Manipulation"],
    demoLink: "#",
    codeLink: "#"
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-sans">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60"
        style={{ y: backgroundY }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "bg-transparent py-4"}`}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" onClick={(e) => handleNavClick(e, "hero")} className="text-2xl font-bold tracking-tighter flex items-center gap-1 group">
            <span className="text-primary transition-transform group-hover:-translate-x-1">{'<'}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Alex</span>
            <span className="text-primary transition-transform group-hover:translate-x-1">{'>'}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)] relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
              </a>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 hover:from-primary hover:to-accent transition-all"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 container mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium shadow-[0_0_15px_rgba(0,245,255,0.2)]"
            >
              <Terminal size={16} /> <span>System initialized</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter mb-6"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]">Alex</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-light"
            >
              A 16-year-old developer & creator. Building the future of the web, one electric interface at a time.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
            >
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "projects")}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary px-8 py-4 font-bold text-primary-foreground transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">View My Work <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute -inset-1 bg-primary opacity-50 blur-xl group-hover:opacity-75 transition-opacity z-[-1]" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="w-full sm:w-auto group inline-flex items-center justify-center rounded-md border border-border bg-card/50 backdrop-blur-sm px-8 py-4 font-bold text-foreground transition-all hover:border-secondary hover:bg-secondary/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 px-6 container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16 flex items-center gap-4">
              <span className="text-primary font-mono text-xl md:text-2xl">01.</span> About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative aspect-square rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center">
                  {/* Abstract Geometric Avatar */}
                  <svg viewBox="0 0 200 200" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
                    <path fill="hsl(var(--primary))" d="M45.7,-76.4C58.9,-69.3,69.1,-55.3,77.5,-40.7C85.9,-26.1,92.5,-11,91.8,3.9C91.1,18.8,83.1,33.5,73.5,46.5C63.9,59.5,52.7,70.8,39.3,77.9C25.9,85,10.3,87.9,-4.6,83.8C-19.5,79.7,-33.7,68.6,-46.7,56.7C-59.7,44.8,-71.5,32,-78.6,16.5C-85.7,1,-88.1,-17.2,-80.9,-32.1C-73.7,-47,-56.9,-58.5,-41.5,-64.8C-26.1,-71.1,-12.1,-72.2,2.3,-76.3C16.7,-80.4,32.5,-83.5,45.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
                    <circle cx="100" cy="100" r="40" fill="hsl(var(--background))" />
                    <path fill="hsl(var(--accent))" d="M100,60 L140,100 L100,140 L60,100 Z" />
                  </svg>
                </div>
              </div>
              
              <div className="text-left space-y-6 text-lg text-muted-foreground">
                <p>
                  I'm a <span className="text-foreground font-medium">high school student</span> with an obsession for building things that live on the internet. What started as curiosity about how websites work has turned into a deep passion for software engineering.
                </p>
                <p>
                  When I'm not studying for exams, I'm usually hacking away at side projects, learning new frameworks, or trying to make my code run just a little bit faster.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-lg bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    <Code className="text-primary mb-2" />
                    <h4 className="font-bold text-foreground">Self-Taught</h4>
                    <p className="text-sm">Learning since age 13</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    <Cpu className="text-accent mb-2" />
                    <h4 className="font-bold text-foreground">Maker</h4>
                    <p className="text-sm">Always shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-6 container mx-auto bg-card/30 border-y border-border">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16 flex items-center gap-4">
              <span className="text-primary font-mono text-xl md:text-2xl">02.</span> Technical Arsenal
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group relative flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                >
                  <skill.icon 
                    className="text-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]" 
                    style={{ color: skill.color }} 
                  />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center w-full max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16 flex items-center gap-4">
              <span className="text-primary font-mono text-xl md:text-2xl">03.</span> Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 w-full">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col h-full rounded-2xl bg-card border border-border overflow-hidden transition-all hover:border-accent hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Code size={24} />
                      </div>
                      <div className="flex gap-4 text-muted-foreground">
                        <a href={project.codeLink} className="hover:text-primary transition-colors" aria-label="GitHub Repository">
                          <Github size={20} />
                        </a>
                        <a href={project.demoLink} className="hover:text-primary transition-colors" aria-label="Live Demo">
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-8 flex-1">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center max-w-3xl mx-auto w-full"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center gap-4">
              <span className="text-primary font-mono text-xl md:text-2xl">04.</span> Get In Touch
            </h2>
            
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-xl">
              Currently looking for new opportunities and interesting projects. Whether you have a question or just want to say hi, my inbox is always open. Let's build something together!
            </p>
            
            <div className="w-full p-8 md:p-10 rounded-2xl bg-card border border-border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
              
              <form onSubmit={handleContactSubmit} className="relative z-10 flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <Input id="name" required placeholder="John Doe" className="bg-background border-border focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <Input id="email" type="email" required placeholder="john@example.com" className="bg-background border-border focus-visible:ring-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <Textarea id="message" required placeholder="Hello Alex, I'd like to talk about..." className="min-h-[150px] bg-background border-border focus-visible:ring-primary" />
                </div>
                
                <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground font-bold text-md py-6 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div className="flex items-center gap-6 mt-16">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="p-4 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center text-muted-foreground relative z-10 bg-background">
        <p className="font-mono text-sm">
          Designed & Built by Alex
        </p>
        <p className="text-xs mt-2 opacity-70">
          Made with <span className="text-red-500">❤️</span> and a lot of coffee
        </p>
      </footer>
    </div>
  );
}
