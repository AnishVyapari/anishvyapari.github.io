import { motion } from "motion/react";
import { MessageCircle, Headphones, Activity } from "lucide-react";
import { useState, useEffect } from "react";

interface LanyardData {
  discord_user: {
    username: string;
    display_name: string;
    avatar: string;
    id: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{
    name: string;
    type: number;
    state?: string;
    details?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
    };
  }>;
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
  };
}

export function LanyardDiscord() {
  const [lanyard, setLanyard] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  const discordUserId = "1265981186283409571"; // Replace with actual Discord user ID
  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
        const data = await response.json();
        if (data.success) {
          setLanyard(data.data);
        }
      } catch (error) {
        console.error("Error fetching Lanyard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [discordUserId]);

  const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusLabels = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline",
  };

  const customStatus = lanyard?.activities.find((a) => a.type === 4);

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6 border-purple-500/30 relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 60px -15px rgba(139, 92, 246, 0.5)",
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.1), transparent)",
        }}
      />

      <div className="relative z-10">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-purple-500/20 rounded-full w-20" />
            <div className="h-4 bg-purple-500/20 rounded w-3/4" />
            <div className="h-3 bg-purple-500/20 rounded w-1/2" />
          </div>
        ) : lanyard ? (
          <>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                {lanyard.discord_user.avatar ? (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.png?size=128`}
                    alt={lanyard.discord_user.display_name}
                    className="w-20 h-20 rounded-full ring-4 ring-purple-500/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-600 flex items-center justify-center ring-4 ring-purple-500/20">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                )}
                <motion.div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 ${
                    statusColors[lanyard.discord_status]
                  } rounded-full border-4 border-[#0a0118]`}
                  animate={{
                    scale: lanyard.discord_status === "online" ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl text-purple-100">
                  {lanyard.discord_user.display_name}
                </h3>
                <p className="text-purple-300/80 font-mono">@{lanyard.discord_user.username}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2.5 h-2.5 ${
                      statusColors[lanyard.discord_status]
                    } rounded-full`}
                  />
                  <span className="text-sm text-purple-400">
                    {statusLabels[lanyard.discord_status]}
                  </span>
                </div>
              </div>
            </div>

            {customStatus && (
              <motion.div
                className="glass rounded-xl p-4 mb-4 border border-purple-500/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300">Custom Status</span>
                </div>
                <p className="text-purple-200/90 text-sm">{customStatus.state}</p>
              </motion.div>
            )}

            {lanyard.listening_to_spotify && lanyard.spotify && (
              <motion.div
                className="glass rounded-xl p-4 mb-4 border border-green-500/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-green-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-green-300 mb-1">Listening to Spotify</p>
                    <p className="text-purple-100 truncate">{lanyard.spotify.song}</p>
                    <p className="text-purple-300/70 text-sm truncate">
                      {lanyard.spotify.artist}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.a
              href="https://discord.gg/dzsKgWMgjJ"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 px-4 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors shadow-lg shadow-indigo-500/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="inline w-4 h-4 mr-2" />
              Join Discord Server
            </motion.a>
          </>
        ) : (
          <div className="text-center text-purple-300">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Discord status unavailable</p>
          </div>
        )}
      </div>

      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
