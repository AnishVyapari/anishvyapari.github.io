import { motion } from "motion/react";
import Giscus from "@giscus/react";
import { getParticleCount } from "../utils/performance";

export function CommentsSection() {
  return (
    <section id="comments" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(getParticleCount())].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Comments
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Giscus
            repo="AnishVyapari/AnishVyapari.github.io"
            repoId="R_kgDONXxUDA"
            category="General"
            categoryId="DIC_kwDONXxUDM4ClMXV"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="dark"
            lang="en"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
