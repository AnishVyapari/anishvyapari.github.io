import { motion } from "motion/react";
import { ReactNode } from "react";

interface PressableButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function PressableButton({ children, onClick, href, className = "" }: PressableButtonProps) {
  const MotionComponent = href ? motion.a : motion.button;
  
  return (
    <MotionComponent
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`relative px-8 py-4 rounded-xl overflow-hidden ${className}`}
      style={{
        background: "rgba(139, 92, 246, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(139, 92, 246, 0.5)",
        boxShadow: "0 8px 32px 0 rgba(139, 92, 246, 0.37), inset 0 2px 8px 0 rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 12px 40px 0 rgba(139, 92, 246, 0.5), inset 0 2px 8px 0 rgba(255, 255, 255, 0.15)",
      }}
      whileTap={{ 
        scale: 0.95,
        boxShadow: "0 4px 16px 0 rgba(139, 92, 246, 0.3), inset 0 1px 4px 0 rgba(0, 0, 0, 0.2)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10 text-white">{children}</span>
    </MotionComponent>
  );
}
