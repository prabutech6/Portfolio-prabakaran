import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from './IconHelper';
import { ExternalLink } from 'lucide-react';
interface Tool {
  iconName: string;
  toolName: string;
}
interface ProjectCardProps {
  projectName: string;
  description: string;
  tools: Tool[];
  link?: string;
  index: number;
}
export function ProjectCard({
  projectName,
  description,
  tools,
  link,
  index
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      whileInView={{
        opacity: 1,
        scale: 1
      }}
      viewport={{
        once: true,
        margin: '-50px'
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1
      }}
      whileHover={{
        y: -5
      }}
      className="group relative bg-surface rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full">
      
      {/* Animated Border Glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative bg-surface p-8 flex flex-col h-full rounded-2xl z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors duration-300">
            {projectName}
          </h3>
          {link &&
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors p-2 -mr-2 -mt-2"
            aria-label={`View ${projectName}`}>
            
              <ExternalLink size={20} />
            </a>
          }
        </div>

        <p className="text-gray-400 mb-8 flex-1 leading-relaxed">
          {description}
        </p>

        <div className="pt-6 border-t border-white/5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Tools Used
          </p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) =>
            <div
              key={i}
              className="flex items-center space-x-2 bg-background px-3 py-1.5 rounded-lg border border-white/5">
              
                <DynamicIcon
                name={tool.iconName}
                size={14}
                className="text-primary" />
              
                <span className="text-xs text-gray-300">{tool.toolName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>);

}