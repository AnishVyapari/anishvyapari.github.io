import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Github,
  Mail,
  Code2,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  Instagram,
  MessageCircle,
  Brain,
  Calendar,
} from "lucide-react";
import { ScrollProgress } from "./components/ScrollProgress";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { FloatingParticles } from "./components/FloatingParticles";
import { StarField } from "./components/StarField";
import { ConnectionLines } from "./components/ConnectionLines";
import { CursorGlow } from "./components/CursorGlow";
import { MatrixRain } from "./components/MatrixRain";
import { GlitchText } from "./components/GlitchText";
import { MagneticButton } from "./components/MagneticButton";
import { PressableButton } from "./components/PressableButton";
import { EnhancedProjectCard } from "./components/EnhancedProjectCard";
import { SkillBadge } from "./components/SkillBadge";
import { GitHubActivity } from "./components/GitHubActivity";
import { EnhancedLanyardDiscord } from "./components/EnhancedLanyardDiscord";
import { ParallaxSection } from "./components/ParallaxSection";
import { SocialLinks } from "./components/SocialLinks";
import { SupportSection } from "./components/SupportSection";
import { AcademicTimeline } from "./components/AcademicTimeline";
import { EnhancedInstagramFeed } from "./components/EnhancedInstagramFeed";
import { CommentsSection } from "./components/CommentsSection";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

interface GitHubUser {
  name: string;
  bio: string;
  avatar_url: string;
  email: string;
  public_repos: number;
  followers: number;
  following: number;
  blog: string;
  location: string;
}

export default function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all(
          [
            fetch("https://api.github.com/users/AnishVyapari"),
            fetch(
              "https://api.github.com/users/AnishVyapari/repos?sort=updated&per_page=100",
            ),
          ],
        );

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        setUser(userData);
        setRepos(
          reposData.filter(
            (repo: GitHubRepo) =>
              !repo.name.includes("AnishVyapari"),
          ),
        );
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
    // Refresh data every 5 minutes to show latest repos
    const interval = setInterval(fetchGitHubData, 300000);
    return () => clearInterval(interval);
  }, []);

  const calculateAge = () => {
    const birthDate = new Date(2006, 4, 23); // May 23, 2006
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const skills = [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Data Science",
    "Computer Vision",
    "NLP",
    "Neural Networks",
    "SQL",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
    "FastAPI",
    "Flask",
    "Pandas",
    "NumPy",
    "Keras",
    "OpenCV",
    "Transformers",
  ];

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Comments", href: "#comments" },
    { name: "Skills", href: "#skills" },
    { name: "Support", href: "#support" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ScrollProgress />
      <MatrixRain />
      <StarField />
      <AnimatedBackground />
      <FloatingParticles />
      <ConnectionLines />
      <CursorGlow />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[5] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 glass-strong border-b border-purple-500/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <MagneticButton>
            <motion.div
              className="text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              <GlitchText text="AV" className="text-3xl" />
            </motion.div>
          </MagneticButton>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <MagneticButton key={item.name}>
                <motion.a
                  href={item.href}
                  className="text-purple-200 hover:text-purple-100 transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              </MagneticButton>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-purple-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden glass-strong border-t border-purple-500/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-purple-200 hover:text-purple-100 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          {/* Hero background image */}
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1618902345120-77758161d808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9ufGVufDF8fHx8MTc2MjQ0MzQ0MXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-transparent to-[#0a0118]" />
          </div>

          <motion.div
            className="text-center max-w-6xl mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <ParallaxSection offset={100}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                {user?.avatar_url && (
                  <motion.div
                    className="relative inline-block mb-10"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full blur-3xl opacity-60"
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.img
                      src={user.avatar_url}
                      alt="Anish Vyapari"
                      className="relative w-56 h-56 rounded-full border-4 border-purple-400 shadow-2xl shadow-purple-500/50 ring-8 ring-purple-500/20"
                      whileHover={{ rotate: 360 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -right-2 bg-green-500 w-12 h-12 rounded-full border-4 border-[#0a0118] flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Brain className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                )}

                <motion.h1
                  className="text-8xl md:text-9xl mb-8 relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlitchText
                    text="Anish Vyapari"
                    className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                  />
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-10"
              >
                <div className="flex items-center justify-center gap-4 text-3xl md:text-5xl text-purple-200 mb-6 flex-wrap">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Code2 className="w-12 h-12" />
                  </motion.div>
                  <span className="text-3xl md:text-5xl">
                    AI/ML Engineer
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Brain className="w-12 h-12" />
                  </motion.div>
                </div>
                <p className="text-xl md:text-2xl text-purple-300/80">
                  {calculateAge()} • BTech CSE - AI & ML @ RAIT
                  Nerul
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-12"
              >
                <p className="text-xl md:text-2xl text-purple-100/90 max-w-4xl mx-auto leading-relaxed">
                  {user?.bio ||
                    "Passionate about Machine Learning, AI, and building innovative solutions. Creating intelligent systems that make a difference."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mb-12"
              >
                <SocialLinks />
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-6 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="glass-strong px-8 py-4 rounded-2xl border border-purple-400/50 backdrop-blur-xl"
                  whileHover={{ scale: 1.15, rotate: -8, y: -15 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 12,
                  }}
                  animate={{ y: [0, -8, 0] }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Code2 className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <span className="text-purple-100 text-lg">
                      {user?.public_repos || 0} Repositories
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className="glass-strong px-8 py-4 rounded-2xl border border-purple-400/50 backdrop-blur-xl"
                  whileHover={{ scale: 1.15, rotate: 8, y: -15 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 12,
                  }}
                  animate={{ y: [0, -8, 0] }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Github className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <span className="text-purple-100 text-lg">
                      {user?.followers || 0} Followers
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </ParallaxSection>

            <motion.div
              className="mt-20"
              animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-12 h-12 mx-auto text-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-40 px-6 relative">
          <div id="journey" className="absolute -top-20" />
          <ParallaxSection>
            <div className="max-w-7xl mx-auto relative z-10">
              <motion.h2
                className="text-6xl md:text-7xl mb-20 text-center px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                animate={{ y: [0, -5, 0] }}
              >
                <GlitchText
                  text="About Me"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                />
              </motion.h2>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <EnhancedLanyardDiscord />
                  <AcademicTimeline />
                </div>

                <div className="space-y-10">
                  <GitHubActivity />
                  <EnhancedInstagramFeed />
                </div>
              </div>
            </div>
          </ParallaxSection>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-40 px-6 relative">
          <ParallaxSection offset={60}>
            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div
                className="flex items-center justify-center gap-6 mb-16 px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <motion.h2 
                  className="text-6xl md:text-7xl text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GlitchText
                    text="GitHub Projects"
                    className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  />
                </motion.h2>
                <MagneticButton href="https://github.com/AnishVyapari">
                  <motion.div 
                    className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    animate={{ y: [0, -10, 0] }}
                  >
                    <Github className="w-10 h-10 text-white" />
                  </motion.div>
                </MagneticButton>
              </motion.div>

              <motion.p
                className="text-center text-purple-200/80 mb-12 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Auto-updates with every new repository • Live
                from GitHub API
              </motion.p>

              {loading ? (
                <div className="text-center text-purple-300">
                  <motion.div
                    className="inline-block"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-20 h-20" />
                  </motion.div>
                  <p className="mt-8 text-2xl">
                    Loading projects...
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {repos.slice(0, 9).map((repo, index) => (
                      <EnhancedProjectCard
                        key={repo.id}
                        {...repo}
                        index={index}
                      />
                    ))}
                  </div>

                  {repos.length > 9 && (
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <MagneticButton href="https://github.com/AnishVyapari?tab=repositories">
                        <div className="inline-block">
                          <PressableButton>
                            View All {repos.length} Projects
                            <ExternalLink className="inline w-5 h-5 ml-2" />
                          </PressableButton>
                        </div>
                      </MagneticButton>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </ParallaxSection>
        </section>



        {/* Skills Section */}
        <section id="skills" className="py-40 px-6 relative">
          <ParallaxSection offset={80}>
            <div className="max-w-7xl mx-auto relative z-10">
              <motion.h2
                className="text-5xl md:text-6xl mb-20 text-center px-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <GlitchText
                  text="Skills & Technologies"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                />
              </motion.h2>

              <div className="flex flex-wrap gap-4 justify-center max-w-6xl mx-auto px-4">
                {skills.map((skill, index) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </ParallaxSection>
        </section>

        {/* Support Section */}
        <SupportSection />

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 relative">
          <ParallaxSection>
            <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
              <motion.h2
                className="text-6xl md:text-7xl mb-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                animate={{ y: [0, -5, 0] }}
              >
                <GlitchText
                  text="Let's Connect"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                />
              </motion.h2>

              <motion.p
                className="text-2xl text-purple-100/80 mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Interested in collaboration or have a project in
                mind? Let's build something amazing together!
              </motion.p>

              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <SocialLinks />
              </motion.div>

              <motion.div
                className="grid md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <MagneticButton
                  href={`mailto:${user?.email || "anish@example.com"}`}
                >
                  <motion.div
                    className="glass-strong rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400 transition-all"
                    whileHover={{ scale: 1.1, y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    animate={{ y: [0, -5, 0] }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl text-purple-200 mb-2">
                      Email
                    </h3>
                    <p className="text-purple-300/70 text-sm">
                      Send me a message
                    </p>
                  </motion.div>
                </MagneticButton>

                <MagneticButton href="https://discord.gg/dzsKgWMgjJ">
                  <motion.div
                    className="glass-strong rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400 transition-all"
                    whileHover={{ scale: 1.1, y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    animate={{ y: [0, -5, 0] }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MessageCircle className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl text-purple-200 mb-2">
                      Discord
                    </h3>
                    <p className="text-purple-300/70 text-sm">
                      Join my server
                    </p>
                  </motion.div>
                </MagneticButton>

                <MagneticButton href="https://www.instagram.com/anish_vyapari/">
                  <motion.div
                    className="glass-strong rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400 transition-all"
                    whileHover={{ scale: 1.1, y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    animate={{ y: [0, -5, 0] }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Instagram className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl text-purple-200 mb-2">
                      Instagram
                    </h3>
                    <p className="text-purple-300/70 text-sm">
                      @anish_vyapari
                    </p>
                  </motion.div>
                </MagneticButton>
              </motion.div>

              {/* Comments Section */}
              <motion.div
                className="mt-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                id="comments"
              >
                <CommentsSection />
              </motion.div>
            </div>
          </ParallaxSection>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-purple-500/30 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl mb-4">
                  <GlitchText
                    text="Anish Vyapari"
                    className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  />
                </h3>
                <p className="text-purple-200/70 leading-relaxed">
                  AI/ML Engineer passionate about creating
                  intelligent solutions that shape the future
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-xl mb-4 text-purple-200">
                  Quick Links
                </h4>
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block text-purple-300/70 hover:text-purple-200 transition-colors"
                      whileHover={{ x: 10, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      delay={index * 0.05}
                    >
                      → {item.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xl mb-4 text-purple-200">
                  Connect
                </h4>
                <div className="flex gap-4">
                  <MagneticButton href="https://github.com/AnishVyapari">
                    <div className="p-4 rounded-xl glass border border-purple-500/30 text-purple-300 hover:text-purple-100 hover:border-purple-400 transition-all">
                      <Github className="w-6 h-6" />
                    </div>
                  </MagneticButton>
                  <MagneticButton href="https://www.instagram.com/anish_vyapari/">
                    <div className="p-4 rounded-xl glass border border-purple-500/30 text-pink-300 hover:text-pink-100 hover:border-pink-400 transition-all">
                      <Instagram className="w-6 h-6" />
                    </div>
                  </MagneticButton>
                  <MagneticButton
                    href={`mailto:${user?.email || "anishvyaparionline@gmail.com"}`}
                  >
                    <div className="p-4 rounded-xl glass border border-purple-500/30 text-purple-300 hover:text-purple-100 hover:border-purple-400 transition-all">
                      <Mail className="w-6 h-6" />
                    </div>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="text-center pt-12 border-t border-purple-500/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-purple-300/70 text-lg">
                © {new Date().getFullYear()} Anish Vyapari.
                Built with React, Motion, and lots of{" "}
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  ✨
                </motion.span>
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
}