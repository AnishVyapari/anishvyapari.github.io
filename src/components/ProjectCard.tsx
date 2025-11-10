import { motion } from "motion/react";
import { ExternalLink, Star, GitFork } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  index: number;
}

export function ProjectCard({
  name,
  description,
  html_url,
  stargazers_count,
  forks_count,
  language,
  topics,
  index,
}: ProjectCardProps) {
  return (
    <motion.a
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-strong rounded-2xl p-6 hover:border-purple-400 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      }}
      whileHover={{ 
        scale: 1.03,
        y: -5,
        boxShadow: "0 20px 60px 0 rgba(139, 92, 246, 0.4)",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl text-purple-200 flex items-center gap-2">
          {name}
          <ExternalLink className="w-4 h-4" />
        </h3>
        <div className="flex gap-3 text-sm text-purple-300">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {forks_count}
          </span>
        </div>
      </div>
      
      <p className="text-purple-100/80 mb-4 line-clamp-2">
        {description || "No description available"}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {topics.slice(0, 5).map((topic) => (
          <span
            key={topic}
            className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200 border border-purple-500/30"
          >
            {topic}
          </span>
        ))}
      </div>
      
      {language && (
        <div className="flex items-center gap-2 text-sm text-purple-300">
          <div className="w-3 h-3 rounded-full bg-purple-400" />
          {language}
        </div>
      )}
    </motion.a>
  );
}
