import { motion } from "motion/react";
import { Instagram, Heart, MessageCircle, ExternalLink, Video, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface InstagramMedia {
  id: string;
  caption: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  username?: string;
}

export function EnhancedInstagramFeed() {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      try {
        const ACCESS_TOKEN = "IGAAQL01lYE1xBZAFJrZAFBCWktPaTFXT19iYjlEMU9pS2RtbHpHNkNKbmNDQ1lEQldVdlExWFdyYTVqeUJmaHRlRXdIYktrMzV0bzRlS3o1bUJqRkhldktwTDByRDRYcmRsTjFkNXBRd1JHdFlCUzVuck1yLUFQMGNSNjZARUXJTTQZDZD";
        
        // Fetch real Instagram media
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,permalink,timestamp,media_type,username&access_token=${ACCESS_TOKEN}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch Instagram media");
        }
        
        const data = await response.json();
        setMedia(data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching Instagram media:", err);
        setError("Unable to load Instagram content");
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramMedia();
    // Refresh every 5 minutes
    const interval = setInterval(fetchInstagramMedia, 300000);
    return () => clearInterval(interval);
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

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Video className="w-5 h-5 text-white" />;
      case "CAROUSEL_ALBUM":
        return <ImageIcon className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="glass-strong rounded-2xl p-8 border-purple-500/30 relative overflow-hidden"
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

      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg shadow-pink-500/50"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              animate={{ rotate: [0, 5, -5, 0], y: [0, -3, 0] }}
            >
              <Instagram className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h3 className="text-3xl text-purple-200">Instagram Feed</h3>
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

        {loading ? (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto custom-scrollbar pr-4 max-h-96">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="aspect-square glass rounded-2xl animate-pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto custom-scrollbar pr-4 max-h-96">
            {media.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden border border-purple-500/20 hover:border-pink-400/50 transition-all shadow-lg"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, zIndex: 10, y: -8 }}
                transition={{
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <ImageWithFallback
                  src={item.thumbnail_url || item.media_url}
                  alt={item.caption || "Instagram post"}
                  className="w-full h-full object-cover"
                />
                
                {/* Media type indicator */}
                {item.media_type !== "IMAGE" && (
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-sm">
                    {getMediaIcon(item.media_type)}
                  </div>
                )}

                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-sm mb-2 line-clamp-3">
                    {item.caption || "No caption"}
                  </p>
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="opacity-70">
                      {formatTime(item.timestamp)}
                    </span>
                    <ExternalLink className="w-4 h-4" />
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
          className="block text-center mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Instagram className="inline w-5 h-5 mr-2" />
          View Full Instagram Profile
        </motion.a>
      </div>
    </motion.div>
  );
}
