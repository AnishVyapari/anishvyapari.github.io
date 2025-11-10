import { motion } from "motion/react";
import { Github, Mail, Instagram, MessageCircle } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

interface SocialLink {
  name: string;
  icon: typeof Github;
  href: string;
  color: string;
  gradient: string;
}

export function SocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/AnishVyapari",
      color: "text-purple-400",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/anish_vyapari/",
      color: "text-pink-400",
      gradient: "from-pink-500 via-purple-500 to-orange-500",
    },
    {
      name: "Discord",
      icon: MessageCircle,
      href: "https://discord.gg/dzsKgWMgjJ",
      color: "text-indigo-400",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:anishvyaparionline@gmail.com",
      color: "text-purple-400",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <MagneticButton key={link.name} href={link.href}>
            <motion.div
              className={`relative p-4 rounded-2xl overflow-hidden group`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.1 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              {/* Glass effect */}
              <div className="absolute inset-0 glass-strong" />

              {/* Icon */}
              <div className="relative z-10">
                <Icon className={`w-6 h-6 ${link.color} group-hover:scale-110 transition-transform`} />
              </div>

              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${link.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </MagneticButton>
        );
      })}
    </div>
  );
}
