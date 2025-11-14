import { motion } from "motion/react";
import { getParticleCount } from "../utils/performance";
import { useState, useEffect } from "react";

const COMMENTS_API = "https://api.jsonbin.io/v3/b/673620a6ad19ca34f8c7f3d7";
const API_KEY = "$2a$10$7vXq29fN8jY5xHZQwE6eKuL3q6BvRktH9mP2wX5yB6nK8jD3fV1s0";

export function CommentsSection() {
  const [comments, setComments] = useState<any[]>([]);
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
      const res = await fetch(COMMENTS_API, {
        headers: { "X-Master-Key": API_KEY, "X-Access-Key": "$2a$10$7vXq29fN8jY5xHZQwE6eKuL3q6BvRktH9mP2wX5yB6nK8jD3fV1s0" }
      });
      const data = await res.json();
      setComments(data.record?.comments || []);
    } catch (e) {
      console.error("Failed to fetch comments:", e);
    }
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
      // First, fetch current comments
      const res = await fetch(COMMENTS_API, {
        headers: { "X-Master-Key": API_KEY }
      });
      const data = await res.json();
      const allComments = [...(data.record?.comments || []), newComment];
      
      // Then update with new comment added
      await fetch(COMMENTS_API, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ comments: allComments })
      });
      
      setComments(allComments);
      setName("");
      setText("");
      await fetchComments(); // Refresh to ensure sync
    } catch (e) {
      console.error("Failed to submit comment:", e);
      alert("Failed to post comment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section id="comments" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {[...Array(getParticleCount())].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Leave a Comment</h2>
                <p className="text-gray-400 text-sm">Share your thoughts!</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <div className="relative">
                <textarea
                  placeholder="Your message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none h-32"
                />
                <span className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {text.length}/500
                </span>
              </div>
              <button
                onClick={submitComment}
                disabled={loading || !name.trim() || !text.trim()}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Post Comment
                  </>
                )}
              </button>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Comments ({comments.length})
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.slice().reverse().map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white">{comment.name}</h4>
                            <span className="text-xs text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-gray-300 text-sm break-words">{comment.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
