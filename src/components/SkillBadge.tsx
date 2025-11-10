import { motion } from "motion/react";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      className="glass px-6 py-3 rounded-full border border-purple-400/50 hover:border-purple-400 transition-all relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0, rotateX: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.15,
        rotate: [0, -5, 5, 0],
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.6)",
        transition: {
          rotate: {
            duration: 0.5,
            ease: "easeInOut",
          },
        },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{
          x: "100%",
          transition: {
            duration: 0.6,
            ease: "easeInOut",
          },
        }}
      />
      
      {/* Pulsing background */}
      <motion.div
        className="absolute inset-0 bg-purple-500/10 rounded-full"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.1,
        }}
      />
      
      <span className="text-purple-100 relative z-10">{skill}</span>
    </motion.div>
  );
}