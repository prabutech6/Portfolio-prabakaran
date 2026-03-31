import React from 'react';
import { motion } from 'framer-motion';
export function RippleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
      {/* Center Glow */}
      <div className="absolute w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px]" />

      {/* Ripples */}
      {[0, 1, 2, 3].map((i) =>
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/30"
        initial={{
          width: '0vmin',
          height: '0vmin',
          opacity: 1
        }}
        animate={{
          width: '150vmin',
          height: '150vmin',
          opacity: 0
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: i * 1.5,
          ease: 'easeOut'
        }} />

      )}

      {/* Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
    </div>);

}