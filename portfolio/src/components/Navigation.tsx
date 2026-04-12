import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, BrainCircuit, Cpu, Globe, Mail, History, Layers, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Portal', href: '#hero', icon: Rocket },
    { name: 'Chamber', href: '#about', icon: BrainCircuit },
    { name: 'Control', href: '#skills', icon: Cpu },
    { name: 'Laboratory', href: '#projects', icon: Globe },
    { name: 'Vision', href: '#vision', icon: Lightbulb },
    { name: 'Evolution', href: '#evolution', icon: History },
    { name: 'Infrastructure', href: '#tech-stack', icon: Layers },
    { name: 'Terminal', href: '#contact', icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[70] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500",
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={scrollToTop}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#4DA6FF] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(77,166,255,0.3)]">
            <span className="text-black font-serif font-bold text-2xl">D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tighter text-white group-hover:text-[#4DA6FF] transition-colors leading-none">
              DEV PRASATH L
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-[#4DA6FF] opacity-60">AI ARCHITECT</span>
          </div>
        </motion.div>

        <div className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-[#4DA6FF] hover:opacity-100 transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#4DA6FF] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <button 
          className="lg:hidden w-10 h-10 flex items-center justify-center text-[#4DA6FF] hover:bg-white/5 transition-colors rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col lg:hidden"
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-6 p-12">
              <div className="w-full max-w-sm space-y-4">
                <p className="font-mono text-[10px] text-[#4DA6FF] tracking-[0.5em] uppercase text-center mb-8 opacity-50">Navigation Protocol</p>
                {navItems.map((item, i) => (
                  <motion.a 
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="flex items-center justify-between p-4 glass border-white/5 hover:border-[#4DA6FF]/30 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-[#4DA6FF] opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="font-serif text-xl uppercase tracking-widest text-white group-hover:text-[#4DA6FF] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="p-12 border-t border-white/5 text-center">
              <p className="font-mono text-[8px] opacity-30 tracking-[0.5em] uppercase">© 2026 DEV PRASATH L // CHENNAI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

