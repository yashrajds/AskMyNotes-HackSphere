import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  Flame,
  Info,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useAuth } from "../contexts/AuthContext";

const performanceData = [
  { date: "Feb 1", points: 1200, streak: 1 },
  { date: "Feb 5", points: 2100, streak: 2 },
  { date: "Feb 10", points: 3400, streak: 3 },
  { date: "Feb 15", points: 4200, streak: 4 },
  { date: "Feb 20", points: 5500, streak: 5 },
  { date: "Feb 25", points: 6420, streak: 5 },
];

const topTopics = [
  { name: "Quantum Mechanics", count: 45 },
  { name: "Differential Equations", count: 38 },
  { name: "Organic Chemistry", count: 32 },
];

export function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [showStreakInfo, setShowStreakInfo] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const username = "Student123";
  const currentRank = 15;
  const competitivePoints = 6420;
  const currentStreak = 5;

  return (
    <div className="gradient-bg min-h-screen text-[#F5F7FA]">
      {/* Mouse-following gradient */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-10 transition-transform duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(46, 140, 230, 0.15) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
        }}
      />

      <div className="relative z-20 max-w-6xl mx-auto px-6 py-8">
        {/* Header with Back and Logout */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="btn-secondary flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Header */}
        <div className="glass-card-strong p-8 mb-8">
          <h1 className="text-5xl gradient-text glow-text mb-6">
            User Profile
          </h1>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="text-[#9AA3B2] text-sm mb-2 uppercase tracking-wide">
                Username
              </div>
              <div className="text-2xl text-[#F5F7FA]">
                {username}
              </div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-[#9AA3B2] text-sm mb-2 uppercase tracking-wide flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4" />
                Current Rank
              </div>
              <div className="text-2xl text-[#3AA0FF]">
                #{currentRank}
              </div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-[#9AA3B2] text-sm mb-2 uppercase tracking-wide flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Points
              </div>
              <div className="text-2xl text-[#3AA0FF]">
                {competitivePoints.toLocaleString()}
              </div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-[#9AA3B2] text-sm mb-2 uppercase tracking-wide flex items-center justify-center gap-2">
                <Flame className="w-4 h-4" />
                Streak
              </div>
              <div className="text-2xl text-[#F5F7FA]">
                {currentStreak} days
              </div>
            </div>
          </div>
        </div>

        {/* Performance Graph */}
        <div className="glass-card-strong p-8 mb-8">
          <h2 className="text-3xl gradient-text mb-6">
            Performance Over Time
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <defs>
                  <linearGradient
                    id="colorPoints"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#3AA0FF"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3AA0FF"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorStreak"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2E8CE6"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#2E8CE6"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="date" stroke="#9AA3B2" />
                <YAxis stroke="#9AA3B2" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(42, 49, 66, 0.9)",
                    border:
                      "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    color: "#F5F7FA",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#3AA0FF"
                  strokeWidth={3}
                  fill="url(#colorPoints)"
                  dot={{ fill: "#3AA0FF", r: 6 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="streak"
                  stroke="#2E8CE6"
                  strokeWidth={3}
                  fill="url(#colorStreak)"
                  dot={{ fill: "#2E8CE6", r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Streak Info */}
          <div className="mt-6 glass-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-[#3AA0FF]" />
              <div>
                <div className="text-[#F5F7FA] text-lg">
                  Maintaining your streak boosts your points.
                </div>
                <div className="text-sm text-[#9AA3B2]">
                  Current multiplier: 1.1x
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowStreakInfo(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>

        {/* Topics Section */}
        <div className="glass-card-strong p-8">
          <h2 className="text-3xl gradient-text mb-6">
            Top 3 Topics Covered
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topTopics.map((topic, index) => (
              <div
                key={index}
                className="glass-card p-6 smooth-transition hover:glow-effect"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                        : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-500"
                          : "bg-gradient-to-br from-orange-400 to-orange-600"
                    }`}
                  >
                    <span className="text-white">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="text-2xl text-[#3AA0FF]">
                    {topic.count}
                  </div>
                </div>
                <h3 className="text-lg text-[#F5F7FA]">
                  {topic.name}
                </h3>
                <p className="text-sm text-[#9AA3B2] mt-2">
                  questions answered
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Streak Info Dialog */}
      <Dialog
        open={showStreakInfo}
        onOpenChange={setShowStreakInfo}
      >
        <DialogContent className="glass-card-strong border-[rgba(255,255,255,0.2)] text-[#F5F7FA]">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
              <Flame className="w-6 h-6" />
              Streak Multipliers
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-[#C7CCD6]">
              Maintain your daily streak to earn multipliers on
              your competitive points!
            </p>
            <div className="space-y-3">
              <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2E8CE6] flex items-center justify-center">
                    <span className="text-xl">1.1×</span>
                  </div>
                  <span className="text-[#F5F7FA]">
                    4-day streak
                  </span>
                </div>
                <div className="text-[#9AA3B2]">+10% bonus</div>
              </div>
              <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#3AA0FF] flex items-center justify-center">
                    <span className="text-xl">1.3×</span>
                  </div>
                  <span className="text-[#F5F7FA]">
                    7-day streak
                  </span>
                </div>
                <div className="text-[#9AA3B2]">+30% bonus</div>
              </div>
              <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2E8CE6] to-[#6BB6FF] flex items-center justify-center">
                    <span className="text-xl">1.5×</span>
                  </div>
                  <span className="text-[#F5F7FA]">
                    10-day streak (MAX)
                  </span>
                </div>
                <div className="text-[#9AA3B2]">+50% bonus</div>
              </div>
            </div>
            <div className="glass-card p-4 bg-[rgba(46,140,230,0.1)]">
              <p className="text-sm text-[#C7CCD6]">
                <strong className="text-[#3AA0FF]">
                  Note:
                </strong>{" "}
                10 days is the maximum multiplier. Keep your
                streak going to maintain the highest bonus!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}