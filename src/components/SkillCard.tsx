import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from './IconHelper';
interface SkillCardProps {
  iconName: string;
  skillName: string;
  descriptionPoints: string[];
  index: number;
}
export function SkillCard({
  iconName,
  skillName,
  descriptionPoints,
  index
}: SkillCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        y: 0
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
        y: -8,
        scale: 1.02
      }}
      className="bg-surface border border-white/5 rounded-2xl p-6 flex flex-col h-full relative group overflow-hidden">
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
        <DynamicIcon name={iconName} size={24} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-heading font-semibold text-white mb-4">
        {skillName}
      </h3>

      <ul className="space-y-2 flex-1">
        {descriptionPoints.map((point, i) =>
        <li key={i} className="flex items-start text-gray-400 text-sm">
            <span className="text-primary mr-2 mt-1 text-[10px]">✦</span>
            {point}
          </li>
        )}
      </ul>
    </motion.div>);

}