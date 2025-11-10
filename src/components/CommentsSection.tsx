import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Trash2, Send, User, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface Comment {
  id: number;
  name: string;
  message: string;
  timestamp: number;
  githubUrl?: string;
}

// GitHub repository info
const GITHUB_OWNER = "AnishVyapari";
const GITHUB_REPO = "AnishVyapari.github.io";
const COMMENTS_ISSUE_NUMBER = 1;
const GITHUB_ISSUE_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${COMMENTS_ISSUE_NUMBER}`;

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);

  // Load comments from GitHub Issue
  useEffect(() => {
    loadComments();
    // Refresh comments every 30 seconds
    const interval = setInterval(loadComments, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      
      // Fetch comments from GitHub Issue (no auth required for public repos)
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${COMMENTS_ISSUE_NUMBER}/comments`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (response.ok) {
        const issueComments = await response.json();
        
        // Parse comments from issue comments
        const parsedComments: Comment[] = issueComments
          .map((comment: any) => {
            try {
              // Extract JSON from comment body (format: <!-- COMMENT_DATA:{...} -->)
              const match = comment.body.match(/<!-- COMMENT_DATA:(.+?) -->/);
              if (match) {
                const commentData = JSON.parse(match[1]);
                commentData.githubUrl = comment.html_url;
                return commentData;
              }
              return null;
            } catch {
              return null;
            }
          })
          .filter((c: any) => c !== null);

        setComments(parsedComments);
        // Also save to localStorage for offline access
        localStorage.setItem("portfolio_comments", JSON.stringify(parsedComments));
      } else {
        // Fallback to localStorage if GitHub API fails
        const stored = localStorage.getItem("portfolio_comments");
        if (stored) {
          setComments(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      // Fallback to localStorage
      const stored = localStorage.getItem("portfolio_comments");
      if (stored) {
        setComments(JSON.parse(stored));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    // Create the GitHub Issue comment format
    const commentBody = `**${newComment.name}** commented:\n\n${newComment.message}\n\n---\n*Posted: ${new Date(newComment.timestamp).toLocaleString()}*\n\n<!-- COMMENT_DATA:${JSON.stringify(newComment)} -->`;

    // Encode for URL
    const encodedBody = encodeURIComponent(commentBody);
    const submitUrl = `${GITHUB_ISSUE_URL}#issuecomment-new`;

    // Show success message and instructions
    setShowSubmitMessage(true);
    setName("");
    setMessage("");
    setIsSubmitting(false);

    // Copy comment to clipboard for easy pasting
    try {
      await navigator.clipboard.writeText(commentBody);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }

    // Auto-reload comments after 5 seconds
    setTimeout(() => {
      loadComments();
      setShowSubmitMessage(false);
    }, 5000);
  };

  const handleDelete = (id: number) => {
    const updatedComments = comments.filter((c) => c.id !== id);
    setComments(updatedComments);
    localStorage.setItem("portfolio_comments", JSON.stringify(updatedComments));
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-4 py-16"
    >
      <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Leave a Comment</h2>
            <p className="text-purple-200">Share your thoughts!</p>
          </div>
        </div>

        {/* Submit Success Message */}
        {showSubmitMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl"
          >
            <p className="text-green-300 font-semibold mb-2">✓ Comment copied to clipboard!</p>
            <p className="text-green-200 text-sm mb-3">
              To complete submission and sync across devices:
            </p>
            <ol className="text-green-200 text-sm space-y-1 mb-3 ml-4 list-decimal">
              <li>Click the button below to open GitHub</li>
              <li>Paste (Ctrl+V) your comment in the text box</li>
              <li>Click "Comment" button</li>
            </ol>
            <a
              href={GITHUB_ISSUE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open GitHub to Submit
            </a>
          </motion.div>
        )}

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
            maxLength={50}
          />
          <div className="relative">
            <textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors resize-none h-32"
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-sm text-purple-300">
              {message.length}/500
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Preparing..." : "Prepare Comment"}
          </motion.button>
          <p className="text-sm text-purple-300 text-center">
            Comments are stored on GitHub for cross-device sync
          </p>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">
            Comments ({comments.length})
          </h3>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-purple-300 mt-4">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageCircle className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
              <p className="text-purple-300">No comments yet. Be the first to leave one!</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{comment.name}</h4>
                        <p className="text-sm text-purple-300">{formatTime(comment.timestamp)}</p>
                      </div>
                    </div>
                    {comment.githubUrl && (
                      <a
                        href={comment.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-purple-300 hover:text-purple-200 transition-colors"
                        title="View on GitHub"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-white/90 leading-relaxed">{comment.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}
