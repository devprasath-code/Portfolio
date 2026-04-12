import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function AICursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Ring */}
      <motion.div
        className="absolute w-12 h-12 border border-[#4DA6FF]/30 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(77, 166, 255, 0.6)' : 'rgba(77, 166, 255, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="absolute w-2 h-2 bg-[#4DA6FF] rounded-full shadow-[0_0_10px_#4DA6FF]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
      />

      {/* Crosshair lines */}
      <motion.div
        className="absolute h-px bg-[#4DA6FF]/20"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovering ? 30 : 20,
          translateX: '-50%',
          translateY: '-50%',
          left: -20,
        }}
        animate={{ opacity: isHovering ? 1 : 0.5 }}
      />
      <motion.div
        className="absolute h-px bg-[#4DA6FF]/20"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovering ? 30 : 20,
          translateX: '-50%',
          translateY: '-50%',
          right: -20,
        }}
        animate={{ opacity: isHovering ? 1 : 0.5 }}
      />
    </div>
  );
}
