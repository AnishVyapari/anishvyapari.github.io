import { motion } from "motion/react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  media_type: string;
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    posts: 0,
  });

  useEffect(() => {
    // Mock Instagram data since we can't access Instagram API without authentication
    // In production, you would need to set up Instagram Basic Display API
    const mockPosts: InstagramPost[] = [
      {
        id: "1",
        caption: "AI/ML projects and coding adventures ✨",
        media_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
        permalink: "https://www.instagram.com/anish_vyapari/",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        like_count: 234,
        comments_count: 12,
        media_type: "IMAGE",
      },
      {
        id: "2",
        caption: "Deep learning model training 🚀",
        media_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
        permalink: "https://www.instagram.com/anish_vyapari/",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        like_count: 189,
        comments_count: 8,
        media_type: "IMAGE",
      },
      {
        id: "3",
        caption: "College life at RAIT 🎓",
        media_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
        permalink: "https://www.instagram.com/anish_vyapari/",
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        like_count: 302,
        comments_count: 15,
        media_type: "IMAGE",
      },
      {
        id: "4",
        caption: "Tech stack and workspace setup 💻",
        media_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
        permalink: "https://www.instagram.com/anish_vyapari/",
        timestamp: new Date(Date.now() - 345600000).toISOString(),
        like_count: 267,
        comments_count: 21,
        media_type: "IMAGE",
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setPosts(mockPosts);
      setStats({
        followers: 1247,
        following: 534,
        posts: 42,
      });
      setLoading(false);
    }, 800);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6 border-purple-500/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3), transparent)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-3 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg shadow-pink-500/50"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Instagram className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl text-purple-200">Instagram</h3>
              <motion.a
                href="https://www.instagram.com/anish_vyapari/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
                whileHover={{ x: 3 }}
              >
                @anish_vyapari
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Stats */}
        {!loading && (
          <motion.div
            className="grid grid-cols-3 gap-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: "Posts", value: stats.posts },
              { label: "Followers", value: stats.followers.toLocaleString() },
              { label: "Following", value: stats.following },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass rounded-xl p-3 text-center border border-purple-500/20"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-xl text-pink-400">{stat.value}</div>
                <div className="text-xs text-purple-300/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="aspect-square glass rounded-xl animate-pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden border border-purple-500/20 hover:border-pink-400/50 transition-all"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <ImageWithFallback
                  src={post.media_url}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-xs mb-2 line-clamp-2">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 text-white text-xs">
                    <motion.span
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                      {post.like_count}
                    </motion.span>
                    <motion.span
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <MessageCircle className="w-3 h-3" />
                      {post.comments_count}
                    </motion.span>
                    <span className="ml-auto text-xs opacity-70">
                      {formatTime(post.timestamp)}
                    </span>
                  </div>
                </motion.div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: "100%",
                    transition: { duration: 0.6 },
                  }}
                />
              </motion.a>
            ))}
          </div>
        )}

        <motion.a
          href="https://www.instagram.com/anish_vyapari/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Instagram className="inline w-4 h-4 mr-2" />
          View Full Profile
        </motion.a>
      </div>
    </motion.div>
  );
}
