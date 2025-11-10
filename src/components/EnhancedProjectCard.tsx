import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EnhancedProjectCardProps {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  index: number;
}

export function EnhancedProjectCard({
  name,
  description,
  html_url,
  stargazers_count,
  forks_count,
  language,
  topics,
  updated_at,
  index,
}: EnhancedProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.a
      ref={cardRef}
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative group"
      initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.08,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, z: 50 }}
    >
      <motion.div
        className="glass-strong rounded-2xl p-6 overflow-hidden h-full relative"
        whileHover={{
          boxShadow: "0 25px 70px -15px rgba(139, 92, 246, 0.5)",
        }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(45deg, #8b5cf6, #ec4899, #8b5cf6)",
            backgroundSize: "200% 200%",
            padding: "2px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(10px)" }}
        />

        {/* Floating glow orbs */}
        <motion.div
          className="absolute w-32 h-32 bg-purple-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-pink-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100"
          animate={{
            x: [0, -50, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{ bottom: "10%", right: "10%" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl text-purple-200 flex items-center gap-2 group-hover:text-purple-100 transition-colors">
              {name}
              <motion.div
                whileHover={{ x: 3, y: -3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </h3>
          </div>

          <p className="text-purple-100/80 mb-4 line-clamp-3 min-h-[4.5rem]">
            {description || "No description available"}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {topics.slice(0, 4).map((topic, i) => (
              <motion.span
                key={topic}
                className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200 border border-purple-500/30"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  delay: index * 0.08 + i * 0.05,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {topic}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-purple-300 pt-4 border-t border-purple-500/20">
            <div className="flex gap-4">
              <motion.span 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <Star className="w-4 h-4" />
                {stargazers_count}
              </motion.span>
              <motion.span 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <GitFork className="w-4 h-4" />
                {forks_count}
              </motion.span>
            </div>
            {language && (
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-purple-400"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(168, 85, 247, 0.7)",
                      "0 0 0 10px rgba(168, 85, 247, 0)",
                      "0 0 0 0 rgba(168, 85, 247, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                {language}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-400 mt-3">
            <Calendar className="w-3 h-3" />
            Updated {formatDate(updated_at)}
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "200% 200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.a>
  );
}