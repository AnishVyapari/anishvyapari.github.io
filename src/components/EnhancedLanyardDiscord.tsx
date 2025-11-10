import { motion } from "motion/react";
import { MessageCircle, Headphones, Activity, Zap, Crown, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface LanyardData {
  discord_user: {
    username: string;
    display_name: string;
    avatar: string;
    id: string;
    discriminator: string;
    bot: boolean;
    avatar_decoration_data?: {
      asset: string;
      sku_id: string;
    };
    public_flags: number;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{
    id: string;
    name: string;
    type: number; // 0 = Game, 1 = Streaming, 2 = Listening, 3 = Watching, 4 = Custom Status, 5 = Competing
    state?: string;
    details?: string;
    emoji?: {
      name: string;
      id?: string;
      animated?: boolean;
    };
    created_at: number;
    timestamps?: {
      start?: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    application_id?: string;
    buttons?: string[];
  }>;
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
  };
  kv?: Record<string, string>;
}

export function EnhancedLanyardDiscord() {
  const [lanyard, setLanyard] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  const discordUserId = "1265981186283409571"; // Your Discord user ID

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
    const interval = setInterval(fetchLanyard, 15000); // Update every 15 seconds for more real-time feel

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

  const activityTypeLabels = {
    0: "Playing",
    1: "Streaming",
    2: "Listening to",
    3: "Watching",
    4: "", // Custom status
    5: "Competing in",
  };

  const customStatus = lanyard?.activities.find((a) => a.type === 4);
  const otherActivities = lanyard?.activities.filter((a) => a.type !== 4 && a.name !== "Spotify") || [];

  const getActivityIcon = (type: number) => {
    switch (type) {
      case 0:
        return Zap;
      case 1:
        return Activity;
      case 2:
        return Headphones;
      case 3:
        return Activity;
      case 5:
        return Crown;
      default:
        return Activity;
    }
  };

  const formatElapsedTime = (startTimestamp: number) => {
    const now = Date.now();
    const elapsed = now - startTimestamp;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  const getBadges = (publicFlags: number) => {
    const badges = [];
    if (publicFlags & (1 << 0)) badges.push({ name: "Discord Employee", icon: Shield });
    if (publicFlags & (1 << 1)) badges.push({ name: "Partnered Server Owner", icon: Crown });
    if (publicFlags & (1 << 2)) badges.push({ name: "HypeSquad Events", icon: Zap });
    if (publicFlags & (1 << 6)) badges.push({ name: "HypeSquad Bravery", icon: Shield });
    if (publicFlags & (1 << 7)) badges.push({ name: "HypeSquad Brilliance", icon: Shield });
    if (publicFlags & (1 << 8)) badges.push({ name: "HypeSquad Balance", icon: Shield });
    if (publicFlags & (1 << 9)) badges.push({ name: "Early Supporter", icon: Zap });
    if (publicFlags & (1 << 17)) badges.push({ name: "Early Verified Bot Developer", icon: Shield });
    return badges;
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 border-purple-500/30 relative overflow-hidden group"
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
          background: "radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.15), transparent)",
        }}
      />

      <div className="relative z-10">
        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 bg-purple-500/20 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-purple-500/20 rounded w-3/4" />
                <div className="h-4 bg-purple-500/20 rounded w-1/2" />
                <div className="h-3 bg-purple-500/20 rounded w-2/3" />
              </div>
            </div>
          </div>
        ) : lanyard ? (
          <>
            <div className="flex items-start gap-5 mb-6">
              <div className="relative flex-shrink-0">
                {lanyard.discord_user.avatar ? (
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={`https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.png?size=256`}
                      alt={lanyard.discord_user.display_name}
                      className="w-24 h-24 rounded-full ring-4 ring-purple-500/30 shadow-xl shadow-purple-500/30"
                    />
                    {/* Avatar decoration */}
                    {lanyard.discord_user.avatar_decoration_data && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      >
                        <img
                          src={`https://cdn.discordapp.com/avatar-decoration-presets/${lanyard.discord_user.avatar_decoration_data.asset}.png?size=256`}
                          alt="Avatar decoration"
                          className="w-full h-full"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-600 flex items-center justify-center ring-4 ring-purple-500/30 shadow-xl">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                )}
                <motion.div
                  className={`absolute -bottom-1 -right-1 w-7 h-7 ${
                    statusColors[lanyard.discord_status]
                  } rounded-full border-4 border-[#0a0118] shadow-lg`}
                  animate={{
                    scale: lanyard.discord_status === "online" ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-3xl text-purple-100 mb-1">
                  {lanyard.discord_user.display_name}
                </h3>
                <p className="text-purple-300/80 font-mono mb-2">
                  @{lanyard.discord_user.username}
                  {lanyard.discord_user.discriminator !== "0" && `#${lanyard.discord_user.discriminator}`}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-3 h-3 ${
                      statusColors[lanyard.discord_status]
                    } rounded-full`}
                  />
                  <span className="text-sm text-purple-400">
                    {statusLabels[lanyard.discord_status]}
                  </span>
                </div>

                {/* User badges */}
                {lanyard.discord_user.public_flags > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getBadges(lanyard.discord_user.public_flags).map((badge) => {
                      const BadgeIcon = badge.icon;
                      return (
                        <motion.div
                          key={badge.name}
                          className="px-3 py-1 rounded-lg glass border border-purple-500/30 flex items-center gap-1.5 text-xs text-purple-300"
                          whileHover={{ scale: 1.05 }}
                          title={badge.name}
                        >
                          <BadgeIcon className="w-3 h-3 text-yellow-400" />
                          {badge.name}
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Custom KV bio if available */}
                {lanyard.kv?.bio && (
                  <p className="text-purple-200/90 text-sm leading-relaxed mb-3 italic">
                    "{lanyard.kv.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* Custom Status */}
            {customStatus && (
              <motion.div
                className="glass rounded-2xl p-5 mb-4 border border-purple-500/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300">Custom Status</span>
                </div>
                <div className="flex items-center gap-2">
                  {customStatus.emoji && (
                    <span className="text-2xl">
                      {customStatus.emoji.id ? (
                        <img
                          src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? "gif" : "png"}?size=32`}
                          alt={customStatus.emoji.name || "emoji"}
                          className="w-6 h-6"
                        />
                      ) : (
                        customStatus.emoji.name
                      )}
                    </span>
                  )}
                  <p className="text-purple-100 text-base">{customStatus.state}</p>
                </div>
              </motion.div>
            )}

            {/* Other Activities */}
            {otherActivities.length > 0 && (
              <div className="space-y-3 mb-4">
                {otherActivities.map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <motion.div
                      key={activity.id}
                      className="glass rounded-2xl p-5 border border-purple-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-start gap-4">
                        {activity.assets?.large_image && (
                          <img
                            src={
                              activity.assets.large_image.startsWith("mp:external")
                                ? `https://media.discordapp.net/external/${activity.assets.large_image.slice(12)}`
                                : activity.application_id
                                ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                                : ""
                            }
                            alt={activity.assets.large_text || activity.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <ActivityIcon className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-300">
                              {activityTypeLabels[activity.type as keyof typeof activityTypeLabels]} {activity.name}
                            </span>
                          </div>
                          {activity.details && (
                            <p className="text-purple-100 text-sm mb-1">{activity.details}</p>
                          )}
                          {activity.state && (
                            <p className="text-purple-300/70 text-xs mb-1">{activity.state}</p>
                          )}
                          {activity.timestamps?.start && (
                            <p className="text-purple-400/60 text-xs">
                              {formatElapsedTime(activity.timestamps.start)} elapsed
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Spotify */}
            {lanyard.listening_to_spotify && lanyard.spotify && (
              <motion.div
                className="glass rounded-2xl p-5 mb-4 border border-green-500/30 bg-green-500/5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={lanyard.spotify.album_art_url}
                    alt={lanyard.spotify.album}
                    className="w-20 h-20 rounded-xl shadow-lg shadow-green-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Headphones className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-green-300">Listening to Spotify</span>
                    </div>
                    <p className="text-purple-100 truncate mb-1">{lanyard.spotify.song}</p>
                    <p className="text-purple-300/70 text-sm truncate">
                      by {lanyard.spotify.artist}
                    </p>
                    <p className="text-purple-400/60 text-xs truncate mt-1">
                      {lanyard.spotify.album}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.a
              href="https://discord.gg/dzsKgWMgjJ"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-4 px-6 rounded-2xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors shadow-lg shadow-indigo-500/40"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="inline w-5 h-5 mr-2" />
              Join My Discord Server
            </motion.a>
          </>
        ) : (
          <div className="text-center text-purple-300 py-8">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Discord status unavailable</p>
          </div>
        )}
      </div>

      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
