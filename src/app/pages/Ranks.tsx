import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Trophy, Search, ArrowLeft, LogOut } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";

interface RankEntry {
  rank: number;
  username: string;
  points: number;
  streak: number;
}

const mockUniversityRanks: RankEntry[] = [
  { rank: 1, username: "TopStudent", points: 15420, streak: 12 },
  { rank: 2, username: "BrainMaster", points: 14850, streak: 10 },
  { rank: 3, username: "StudyPro", points: 13920, streak: 8 },
  { rank: 4, username: "AcademicStar", points: 12750, streak: 7 },
  { rank: 5, username: "QuizKing", points: 11680, streak: 9 },
  { rank: 6, username: "NoteNinja", points: 10950, streak: 6 },
  { rank: 7, username: "ExamAce", points: 9870, streak: 5 },
  { rank: 8, username: "LearnMaster", points: 9120, streak: 8 },
  { rank: 9, username: "KnowledgeSeeker", points: 8450, streak: 4 },
  { rank: 10, username: "ScholarChamp", points: 7980, streak: 7 },
  { rank: 15, username: "Student123", points: 6420, streak: 5 },
];

const mockRegionalRanks: RankEntry[] = [
  { rank: 1, username: "RegionalChamp", points: 28450, streak: 15 },
  { rank: 2, username: "AreaLeader", points: 26830, streak: 14 },
  { rank: 3, username: "ZoneExpert", points: 24920, streak: 12 },
  { rank: 4, username: "DistrictPro", points: 23150, streak: 11 },
  { rank: 5, username: "CityMaster", points: 21680, streak: 13 },
  { rank: 6, username: "LocalGenius", points: 19950, streak: 10 },
  { rank: 7, username: "TownStar", points: 18870, streak: 9 },
  { rank: 8, username: "NeighborAce", points: 17120, streak: 11 },
  { rank: 9, username: "AreaScholar", points: 15450, streak: 8 },
  { rank: 10, username: "RegionPro", points: 13980, streak: 10 },
  { rank: 142, username: "Student123", points: 6420, streak: 5 },
];

const mockGlobalRanks: RankEntry[] = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  username: `GlobalPlayer${i + 1}`,
  points: 50000 - i * 800,
  streak: Math.floor(Math.random() * 15) + 1,
}));
mockGlobalRanks.push({ rank: 8421, username: "Student123", points: 6420, streak: 5 });

export function Ranks() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"university" | "regional" | "global">("university");
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getCurrentRanks = () => {
    switch (activeTab) {
      case "university":
        return mockUniversityRanks;
      case "regional":
        return mockRegionalRanks;
      case "global":
        return mockGlobalRanks;
      default:
        return [];
    }
  };

  const filteredRanks = getCurrentRanks().filter((entry) =>
    entry.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top10 = filteredRanks.slice(0, 10);
  const userEntry = filteredRanks.find((entry) => entry.username === "Student123");

  return (
    <div className="gradient-bg min-h-screen text-[#F5F7FA]">
      {/* Mouse-following gradient */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-10 transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(46, 140, 230, 0.15) 0%, transparent 70%)",
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
        <div className="text-center mb-8">
          <h1 className="text-5xl gradient-text glow-text mb-2 flex items-center justify-center gap-3">
            <Trophy className="w-12 h-12" />
            Leaderboard
          </h1>
          <p className="text-[#C7CCD6]">See how you rank against other students</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("university")}
            className={`px-8 py-3 rounded-lg smooth-transition ${
              activeTab === "university"
                ? "btn-primary"
                : "glass-card hover:glow-effect"
            }`}
          >
            University Level
          </button>
          <button
            onClick={() => setActiveTab("regional")}
            className={`px-8 py-3 rounded-lg smooth-transition ${
              activeTab === "regional"
                ? "btn-primary"
                : "glass-card hover:glow-effect"
            }`}
          >
            Regional Level
          </button>
          <button
            onClick={() => setActiveTab("global")}
            className={`px-8 py-3 rounded-lg smooth-transition ${
              activeTab === "global"
                ? "btn-primary"
                : "glass-card hover:glow-effect"
            }`}
          >
            Global Level
          </button>
        </div>

        {/* Search Bar (for Global) */}
        {activeTab === "global" && (
          <div className="mb-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA3B2]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="glass-input pl-10"
              />
            </div>
          </div>
        )}

        {/* Top 10 Leaderboard */}
        <div className="glass-card-strong p-8 mb-6">
          <h2 className="text-2xl gradient-text mb-6">Top 10</h2>
          <div className="space-y-3">
            {top10.map((entry) => (
              <div
                key={entry.rank}
                className={`glass-card p-4 flex items-center justify-between smooth-transition hover:glow-effect ${
                  entry.username === "Student123" ? "border-2 border-[#3AA0FF]" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      entry.rank === 1
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                        : entry.rank === 2
                        ? "bg-gradient-to-br from-gray-300 to-gray-500"
                        : entry.rank === 3
                        ? "bg-gradient-to-br from-orange-400 to-orange-600"
                        : "bg-[#2E8CE6]"
                    }`}
                  >
                    <span className="text-white">#{entry.rank}</span>
                  </div>
                  <div>
                    <div className="text-[#F5F7FA] text-lg">{entry.username}</div>
                    <div className="text-sm text-[#9AA3B2]">
                      {entry.streak} day streak
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#3AA0FF] text-xl">{entry.points.toLocaleString()}</div>
                  <div className="text-xs text-[#9AA3B2]">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User's Position */}
        {userEntry && userEntry.rank > 10 && (
          <div className="glass-card-strong p-6 mb-6">
            <h3 className="text-xl gradient-text mb-4">Your Position</h3>
            <div className="glass-card p-4 border-2 border-[#3AA0FF] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2E8CE6] flex items-center justify-center">
                  <span className="text-white">#{userEntry.rank}</span>
                </div>
                <div>
                  <div className="text-[#F5F7FA] text-lg">{userEntry.username}</div>
                  <div className="text-sm text-[#9AA3B2]">
                    {userEntry.streak} day streak
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#3AA0FF] text-xl">{userEntry.points.toLocaleString()}</div>
                <div className="text-xs text-[#9AA3B2]">points</div>
              </div>
            </div>
          </div>
        )}

        {/* Extended List (Global only) */}
        {activeTab === "global" && (
          <div className="glass-card-strong p-8 mb-6">
            <h2 className="text-2xl gradient-text mb-6">Top 50 Global Rankings</h2>
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {filteredRanks.slice(0, 50).map((entry) => (
                <div
                  key={entry.rank}
                  className={`glass-card p-3 flex items-center justify-between text-sm ${
                    entry.username === "Student123" ? "border border-[#3AA0FF]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#9AA3B2]">#{entry.rank}</span>
                    <span className="text-[#F5F7FA]">{entry.username}</span>
                  </div>
                  <span className="text-[#3AA0FF]">{entry.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Know More Button */}
        {activeTab === "global" && (
          <div className="text-center">
            <Button
              onClick={() => navigate("/profile")}
              className="btn-primary text-lg px-8 py-4"
            >
              Know More About Yourself in User Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}