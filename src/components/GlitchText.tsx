import { motion } from "motion/react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        textShadow: [
          "0 0 10px rgba(139, 92, 246, 0.5)",
          "0 0 20px rgba(139, 92, 246, 0.8)",
          "0 0 10px rgba(139, 92, 246, 0.5)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  );
}
