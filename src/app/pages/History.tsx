import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Filter, ArrowUpDown, LogOut } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useAuth } from "../contexts/AuthContext";

interface HistoryEntry {
  id: string;
  subject: string;
  mode: "Exam" | "Deep Research" | "Competitive";
  date: string;
  score: number;
  duration: string;
}

const mockHistory: HistoryEntry[] = [
  {
    id: "1",
    subject: "Mathematics",
    mode: "Competitive",
    date: "2026-02-25",
    score: 950,
    duration: "45 min",
  },
  {
    id: "2",
    subject: "Physics",
    mode: "Exam",
    date: "2026-02-24",
    score: 820,
    duration: "32 min",
  },
  {
    id: "3",
    subject: "Chemistry",
    mode: "Deep Research",
    date: "2026-02-23",
    score: 0,
    duration: "1 hr 15 min",
  },
  {
    id: "4",
    subject: "Mathematics",
    mode: "Competitive",
    date: "2026-02-22",
    score: 1120,
    duration: "52 min",
  },
  {
    id: "5",
    subject: "Physics",
    mode: "Exam",
    date: "2026-02-21",
    score: 780,
    duration: "38 min",
  },
  {
    id: "6",
    subject: "Chemistry",
    mode: "Competitive",
    date: "2026-02-20",
    score: 890,
    duration: "41 min",
  },
  {
    id: "7",
    subject: "Mathematics",
    mode: "Exam",
    date: "2026-02-19",
    score: 720,
    duration: "35 min",
  },
  {
    id: "8",
    subject: "Physics",
    mode: "Deep Research",
    date: "2026-02-18",
    score: 0,
    duration: "58 min",
  },
  {
    id: "9",
    subject: "Chemistry",
    mode: "Competitive",
    date: "2026-02-17",
    score: 1050,
    duration: "47 min",
  },
  {
    id: "10",
    subject: "Mathematics",
    mode: "Competitive",
    date: "2026-02-16",
    score: 980,
    duration: "43 min",
  },
];

export function History() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "score" | "duration">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredHistory = mockHistory
    .filter((entry) => {
      const matchesSearch =
        entry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.mode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMode = filterMode === "all" || entry.mode === filterMode;
      return matchesSearch && matchesMode;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "score":
          comparison = a.score - b.score;
          break;
        case "duration":
          // Simple duration comparison (convert to minutes)
          const getDurationMinutes = (dur: string) => {
            const parts = dur.split(" ");
            if (parts.length === 2) return parseInt(parts[0]);
            if (parts.includes("hr")) {
              const hours = parseInt(parts[0]);
              const mins = parseInt(parts[2] || "0");
              return hours * 60 + mins;
            }
            return 0;
          };
          comparison = getDurationMinutes(a.duration) - getDurationMinutes(b.duration);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSort = (field: "date" | "score" | "duration") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

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

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-8">
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
          <h1 className="text-5xl gradient-text glow-text mb-2">Study History</h1>
          <p className="text-[#C7CCD6]">Track your learning progress and performance</p>
        </div>

        {/* Filters and Search */}
        <div className="glass-card-strong p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA3B2]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by subject or mode..."
                  className="glass-input pl-10"
                />
              </div>
            </div>
            <Select value={filterMode} onValueChange={setFilterMode}>
              <SelectTrigger className="w-48 glass-input">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by mode" />
              </SelectTrigger>
              <SelectContent className="glass-card-strong border-[rgba(255,255,255,0.2)]">
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Exam">Exam Mode</SelectItem>
                <SelectItem value="Deep Research">Deep Research</SelectItem>
                <SelectItem value="Competitive">Competitive</SelectItem>
              </SelectContent>
            </Select>
            <Button className="btn-secondary flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
          </div>
        </div>

        {/* History Table */}
        <div className="glass-card-strong p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[rgba(255,255,255,0.1)]">
                  <TableHead
                    className="text-[#9AA3B2] cursor-pointer hover:text-[#3AA0FF]"
                    onClick={() => toggleSort("date")}
                  >
                    <div className="flex items-center gap-2">
                      Subject
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-[#9AA3B2]">Mode</TableHead>
                  <TableHead
                    className="text-[#9AA3B2] cursor-pointer hover:text-[#3AA0FF]"
                    onClick={() => toggleSort("date")}
                  >
                    <div className="flex items-center gap-2">
                      Date
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-[#9AA3B2] cursor-pointer hover:text-[#3AA0FF]"
                    onClick={() => toggleSort("score")}
                  >
                    <div className="flex items-center gap-2">
                      Score
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-[#9AA3B2] cursor-pointer hover:text-[#3AA0FF]"
                    onClick={() => toggleSort("duration")}
                  >
                    <div className="flex items-center gap-2">
                      Duration
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="border-b border-[rgba(255,255,255,0.05)] smooth-transition hover:bg-[rgba(58,160,255,0.05)]"
                  >
                    <TableCell className="text-[#F5F7FA]">{entry.subject}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          entry.mode === "Exam"
                            ? "bg-[rgba(46,140,230,0.2)] text-[#3AA0FF]"
                            : entry.mode === "Deep Research"
                            ? "bg-[rgba(107,182,255,0.2)] text-[#6BB6FF]"
                            : "bg-[rgba(46,140,230,0.3)] text-[#2E8CE6]"
                        }`}
                      >
                        {entry.mode}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#C7CCD6]">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-[#3AA0FF]">
                      {entry.score > 0 ? entry.score.toLocaleString() : "—"}
                    </TableCell>
                    <TableCell className="text-[#C7CCD6]">{entry.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12 text-[#9AA3B2]">
              No history entries found matching your criteria.
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl text-[#3AA0FF] mb-2">{mockHistory.length}</div>
            <div className="text-[#9AA3B2]">Total Sessions</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl text-[#3AA0FF] mb-2">
              {mockHistory.filter((e) => e.mode === "Competitive").length}
            </div>
            <div className="text-[#9AA3B2]">Competitive Mode</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl text-[#3AA0FF] mb-2">
              {Math.round(
                mockHistory.reduce((sum, e) => sum + e.score, 0) / mockHistory.filter((e) => e.score > 0).length
              )}
            </div>
            <div className="text-[#9AA3B2]">Avg. Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}