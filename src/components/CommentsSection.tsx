import { motion } from "motion/react";
import { getParticleCount } from "../utils/performance";
import { useState, useEffect } from "react";

const COMMENTS_API = "https://api.jsonbin.io/v3/b/673620a6ad19ca34f8c7f3d7";
const API_KEY = "$2a$10$7vXqZ9fN8jY5xH2QwE6eKuL3qG8vR4tN9mP2wX5yB6hK8jD3fV1sO";

export function CommentsSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch(COMMENTS_API + "/latest", {
        headers: { "X-Master-Key": API_KEY }
      });
      const data = await res.json();
      setComments(data.record.comments || []);
    } catch (e) {}
  };

  const submitComment = async () => {
    if (!name.trim() || !text.trim()) return;
    setLoading(true);
    const newComment = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      time: new Date().toLocaleString()
    };
    try {
      const res = await fetch(COMMENTS_API + "/latest", {
        headers: { "X-Master-Key": API_KEY }
      });
      const data = await res.json();
      const allComments = [...(data.record.comments || []), newComment];
      await fetch(COMMENTS_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
        body: JSON.stringify({ comments: allComments })
      });
      setComments(allComments);
      setName("");
      setText("");
    } catch (e) {}
    setLoading(false);
  };

  return (
    <section id="comments" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
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
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          💬 Comments
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-900/50 p-6 rounded-lg mb-6">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-3 bg-gray-800 rounded text-white"
            />
            <textarea
              placeholder="Leave a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 mb-3 bg-gray-800 rounded text-white h-24"
            />
            <button
              onClick={submitComment}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </div>

          <div className="space-y-4">
            {comments.map((c) => (
              <motion.div
                key={c.id}
                className="bg-gray-900/30 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-purple-400">{c.name}</span>
                  <span className="text-gray-500 text-sm">{c.time}</span>
                </div>
                <p className="text-gray-300">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
