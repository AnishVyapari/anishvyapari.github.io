import { motion } from "motion/react";
import { Coffee, Copy, Check } from "lucide-react";
import { useState } from "react";

export function SupportSection() {
  const [copied, setCopied] = useState(false);
  const upiId = "8422936009@mbk";
  const upiName = "Anish S Vyapari";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="support" className="py-40 px-4 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-7xl md:text-8xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Support My Work
          </span>
        </motion.h2>

        <motion.p
          className="text-xl text-purple-100/80 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          If you find my projects helpful or want to support my journey in AI/ML, consider buying
          me a coffee!
        </motion.p>

        <motion.div
          className="glass-strong rounded-3xl p-12 max-w-md mx-auto border border-purple-500/30"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Coffee className="w-12 h-12 text-white" />
          </motion.div>

          <h3 className="text-3xl text-purple-100 mb-8">Buy Me a Coffee</h3>

          <div className="space-y-6">
            <div className="glass rounded-xl p-6 border border-purple-500/20">
              <p className="text-sm text-purple-300 mb-2">₹ UPI Payment</p>
              <p className="text-xl text-purple-100 mb-4">{upiName}</p>

              <div className="glass rounded-lg p-4 mb-4 border border-purple-400/30">
                <p className="text-sm text-purple-300 mb-2">UPI Handle</p>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-lg text-purple-100 font-mono">{upiId}</code>
                  <motion.button
                    onClick={handleCopy}
                    className="p-2 rounded-lg glass border border-purple-400/30 text-purple-300 hover:text-purple-100 hover:border-purple-400 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>

              <motion.button
                onClick={handleCopy}
                className="block w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                💳 Pay Now via UPI
              </motion.button>
            </div>

            <p className="text-sm text-purple-400">❤️ Thank you for your support!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
