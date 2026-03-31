import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const navLinks = [
{
  name: 'Home',
  href: '#home'
},
{
  name: 'About',
  href: '#about'
},
{
  name: 'Skills',
  href: '#skills'
},
{
  name: 'Projects',
  href: '#projects'
},
{
  name: 'Contact',
  href: '#contact'
}];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past 80% of window height
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      // Scroll spy logic
      const sections = navLinks.map((link) => link.name.toLowerCase());
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string) =>
  {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return (
    <AnimatePresence>
      {isVisible &&
      <motion.nav
        initial={{
          y: '-100%',
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        exit={{
          y: '-100%',
          opacity: 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
        className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 backdrop-blur-md bg-background/80 border-b border-white/5">
        
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="text-xl font-heading font-bold text-white tracking-tight">
            
              P<span className="text-primary">.</span>
            </a>

            <ul className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) =>
            <li key={link.name}>
                  <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium transition-colors duration-200 ${activeSection === link.name.toLowerCase() ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                
                    {link.name}
                  </a>
                </li>
            )}
            </ul>

            {/* Mobile Menu Button - Simplified for this implementation */}
            <div className="md:hidden flex space-x-4">
              {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-xs font-medium ${activeSection === link.name.toLowerCase() ? 'text-primary' : 'text-gray-400'}`}>
              
                  {link.name.substring(0, 1)}
                </a>
            )}
            </div>
          </div>
        </motion.nav>
      }
    </AnimatePresence>);

}