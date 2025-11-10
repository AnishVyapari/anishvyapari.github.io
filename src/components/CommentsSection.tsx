import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Trash2, Send, User } from "lucide-react";
import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load comments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("portfolio_comments");
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    }
  }, []);

  // Save comments to localStorage
  const saveComments = (newComments: Comment[]) => {
    localStorage.setItem("portfolio_comments", JSON.stringify(newComments));
    setComments(newComments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    setTimeout(() => {
      const updatedComments = [newComment, ...comments];
      saveComments(updatedComments);
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleDelete = (id: string) => {
    const updatedComments = comments.filter((c) => c.id !== id);
    saveComments(updatedComments);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <motion.div
      id="comments"
      className="glass-strong rounded-3xl p-8 border-purple-500/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-4xl text-purple-100">Leave a Comment</h3>
            <p className="text-purple-300/70">Share your thoughts!</p>
          </div>
        </div>

        {/* Comment Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-400 transition-all"
              maxLength={50}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-400 transition-all resize-none"
              rows={4}
              maxLength={500}
              required
            />
            <div className="text-right mt-1 text-sm text-purple-400/60">
              {message.length}/500
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Post Comment
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Comments List */}
        <div className="space-y-4">
          <h4 className="text-2xl text-purple-200 mb-4">
            Comments ({comments.length})
          </h4>
          
          <AnimatePresence mode="popLayout">
            {comments.length === 0 ? (
              <motion.div
                className="text-center py-12 text-purple-300/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No comments yet. Be the first to leave one!</p>
              </motion.div>
            ) : (
              comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  className="glass rounded-xl p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all group"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="text-lg text-purple-100">{comment.name}</h5>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-purple-400/70">
                            {formatTime(comment.timestamp)}
                          </span>
                          <motion.button
                            onClick={() => handleDelete(comment.id)}
                            className="p-2 rounded-lg glass border border-red-500/30 text-red-400 hover:text-red-300 hover:border-red-400/50 transition-all opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Delete comment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <p className="text-purple-200/80 leading-relaxed whitespace-pre-wrap break-words">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
