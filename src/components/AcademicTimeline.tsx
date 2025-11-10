import { motion } from "motion/react";
import { GraduationCap, Calendar, MapPin, Code, Brain, Rocket } from "lucide-react";

export function AcademicTimeline() {
  const getCurrentYear = () => new Date().getFullYear();
  const getCurrentMonth = () => new Date().getMonth() + 1; // 0-11, so add 1

  const getAcademicYear = () => {
    const year = getCurrentYear();
    const month = getCurrentMonth();

    // Academic year starts in September 2025
    // Before Sept 2025: upcoming
    if (year < 2025 || (year === 2025 && month < 9)) {
      return 0; // Before starting
    }
    
    // Sept 2025 - Dec 2025: 1st year
    if (year === 2025 && month >= 9) {
      return 1;
    }
    
    // Jan 2026 - Dec 2026: 2nd year
    if (year === 2026) {
      return 2;
    }
    
    // Jan 2027 - Dec 2027: 3rd year
    if (year === 2027) {
      return 3;
    }
    
    // Jan 2028 onwards: 4th year
    if (year >= 2028) {
      return 4;
    }
    
    return 1;
  };

  const currentAcademicYear = getAcademicYear();

  const timeline = [
    {
      year: "1st Year",
      period: "Sept 2025 - Dec 2025",
      status: currentAcademicYear === 1 ? "current" : currentAcademicYear > 1 ? "completed" : "upcoming",
      icon: GraduationCap,
      color: "from-purple-500 to-violet-500",
    },
    {
      year: "2nd Year",
      period: "Jan 2026 - Dec 2026",
      status: currentAcademicYear === 2 ? "current" : currentAcademicYear > 2 ? "completed" : "upcoming",
      icon: Code,
      color: "from-violet-500 to-purple-500",
    },
    {
      year: "3rd Year",
      period: "Jan 2027 - Dec 2027",
      status: currentAcademicYear === 3 ? "current" : currentAcademicYear > 3 ? "completed" : "upcoming",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      year: "4th Year",
      period: "Jan 2028 - Dec 2028",
      status: currentAcademicYear === 4 ? "current" : currentAcademicYear > 4 ? "completed" : "upcoming",
      icon: Rocket,
      color: "from-pink-500 to-purple-500",
    },
    {
      year: "Graduation",
      period: "2029",
      status: getCurrentYear() >= 2029 ? "completed" : "upcoming",
      icon: GraduationCap,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        className="glass-strong rounded-2xl p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl text-purple-200">Education</h3>
            <p className="text-purple-300/80">BTech CSE (AI & ML)</p>
          </div>
        </div>

        <div className="space-y-4 text-purple-100/90">
          <div>
            <p className="text-xl text-purple-200 mb-2">
              RAIT, Nerul
            </p>
            <div className="flex items-center gap-2 text-purple-300/80">
              <MapPin className="w-4 h-4" />
              <span>RAIT Nerul, Navi Mumbai</span>
            </div>
            <p className="text-sm text-purple-400 mt-1">
              19.0176°N, 73.0073°E • IST (UTC+5:30)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="glass rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg text-purple-200">Focus Areas</h4>
              </div>
              <ul className="space-y-1 text-purple-100/80">
                <li>• Deep Learning</li>
                <li>• Computer Vision</li>
              </ul>
            </div>

            <div className="glass rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-5 h-5 text-pink-400" />
                <h4 className="text-lg text-purple-200">Interests</h4>
              </div>
              <ul className="space-y-1 text-purple-100/80">
                <li>• Robotics & Automation</li>
                <li>• Edge AI & MLOps</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="glass-strong rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl text-purple-200">Academic Timeline</h3>
        </div>

        <div className="relative space-y-6 max-h-96 overflow-y-auto custom-scrollbar pr-4">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-violet-500" />

          {timeline.map((item, index) => {
            const Icon = item.icon;
            const isCurrent = item.status === "current";
            const isCompleted = item.status === "completed";

            return (
              <motion.div
                key={index}
                className="relative pl-20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Icon */}
                <motion.div
                  className={`absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${
                    isCurrent ? "ring-4 ring-purple-400 ring-offset-2 ring-offset-[#0a0118]" : ""
                  }`}
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  animate={isCurrent ? { scale: [1, 1.1, 1], y: [0, -5, 0] } : { y: [0, -2, 0] }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <motion.div
                  className={`glass rounded-xl p-5 border ${
                    isCurrent
                      ? "border-purple-400 bg-purple-500/10"
                      : "border-purple-500/20"
                  }`}
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h4 className="text-xl text-purple-200">{item.year}</h4>
                    {isCurrent && (
                      <motion.span
                        className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs border border-purple-400/50"
                        animate={{ opacity: [1, 0.6, 1], scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Current
                      </motion.span>
                    )}
                    {isCompleted && (
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <p className="text-purple-300/80">{item.period}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-8 glass rounded-xl p-4 border border-purple-500/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-200">
            🎓 Expected Graduation: <span className="text-purple-300">2029</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
