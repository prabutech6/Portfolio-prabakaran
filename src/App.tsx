import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Github, Linkedin, FileText } from 'lucide-react';
// Components
import { CustomCursor } from './components/CustomCursor';
import { RippleBackground } from './components/RippleBackground';
import { WaterRippleBackground } from './components/WaterRippleBackground.jsx';
import { Navbar } from './components/Navbar';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';
import { ContactForm } from './components/ContactForm';
// Data
import infoData from './data/info.json';
import skillsData from './data/skills.json';
import projectsData from './data/projects.json';
// Images
import myImage from './images/myimage.jpeg';
export function App() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element)
    element.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <div className="min-h-screen bg-background text-gray-200 selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      <Navbar />

      {/* HOME SECTION */}
      <section
        id="home"
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Water Ripple Background with Image */}
        <WaterRippleBackground backgroundImage={myImage} />
        
        {/* Background Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 z-5" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>
            
            <h2 className="text-primary font-medium tracking-wider uppercase mb-4 text-sm md:text-base">
              Welcome to my portfolio
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 tracking-tight">
              Hello, I am <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                {infoData.name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
              {infoData.title}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          onClick={() => scrollTo('about')}>
          
          <div className="w-10 h-16 rounded-full border-2 border-white/20 flex justify-center p-2 hover:border-primary/50 transition-colors">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.7
            }}>
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 flex items-center">
              <span className="text-primary mr-4">01.</span> About Me
            </h2>

            <div className="bg-surface border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 relative z-10">
                {infoData.bio}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-8 py-4 bg-primary hover:bg-primaryHover text-background font-semibold rounded-xl transition-all hover:scale-105 active:scale-95">
                  
                  Get in Touch
                </button>
                <a
                  href={infoData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 hover:border-white/20 flex items-center justify-center gap-2">
                  
                  <FileText size={20} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        className="py-24 md:py-32 px-6 relative bg-surface/30">
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.7
            }}
            className="mb-16">
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white flex items-center">
              <span className="text-primary mr-4">02.</span> Technical Skills
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((skill, index) =>
            <SkillCard key={index} {...skill} index={index} />
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 md:py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.7
            }}
            className="mb-16">
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white flex items-center">
              <span className="text-primary mr-4">03.</span> Featured Projects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) =>
            <ProjectCard key={index} {...project} index={index} />
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 md:py-32 px-6 relative bg-surface/30">
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.7
            }}
            className="mb-16">
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white flex items-center">
              <span className="text-primary mr-4">04.</span> Get In Touch
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column - Socials */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6
              }}
              className="lg:col-span-2 space-y-8">
              
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  Let's connect
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  I'm currently looking for new opportunities. Whether you have
                  a question or just want to say hi, I'll try my best to get
                  back to you!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${infoData.email}`}
                  className="flex items-center space-x-4 text-gray-300 hover:text-primary transition-colors group p-4 bg-surface rounded-xl border border-white/5">
                  
                  <div className="bg-background p-3 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="font-medium">{infoData.email}</p>
                  </div>
                </a>

                <a
                  href={infoData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-primary transition-colors group p-4 bg-surface rounded-xl border border-white/5">
                  
                  <div className="bg-background p-3 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      LinkedIn
                    </p>
                    <p className="font-medium">Connect with me</p>
                  </div>
                </a>

                <a
                  href={infoData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-primary transition-colors group p-4 bg-surface rounded-xl border border-white/5">
                  
                  <div className="bg-background p-3 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">GitHub</p>
                    <p className="font-medium">View my repositories</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 bg-background">
        <p className="text-gray-500 text-sm">
          Designed & Built by {infoData.name} © {new Date().getFullYear()}
        </p>
      </footer>
    </div>);

}