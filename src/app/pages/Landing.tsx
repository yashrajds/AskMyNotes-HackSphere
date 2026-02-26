import { useNavigate } from "react-router";
import { BookOpen, Shield, Target, Zap, Trophy, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoginDialog } from "../components/LoginDialog";

export function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Don't render landing page if authenticated
  if (isAuthenticated) {
    return null;
  }

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

      {/* Header */}
      <header className="sticky top-0 z-50 glass-card-strong px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl gradient-text">AskMyNotes</h1>
            <p className="text-sm text-[#9AA3B2]">Read Notes; Get Accurate</p>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#home" className="text-[#C7CCD6] hover:text-[#3AA0FF] smooth-transition">
              Home
            </a>
            <a href="#about" className="text-[#C7CCD6] hover:text-[#3AA0FF] smooth-transition">
              About
            </a>
            <a href="#contact" className="text-[#C7CCD6] hover:text-[#3AA0FF] smooth-transition">
              Contact
            </a>
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="btn-secondary"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className="btn-primary"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl mb-6 gradient-text glow-text">
            AI-Powered Study Assistant
          </h2>
          <p className="text-xl text-[#C7CCD6] max-w-2xl mx-auto">
            Get precise, cited answers strictly from your own uploaded notes. Zero hallucination, maximum accuracy.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn-primary mt-8 text-lg px-8 py-3"
          >
            Get Started
          </button>
        </div>

        {/* What We Provide Section */}
        <div id="about" className="mb-20">
          <h3 className="text-3xl text-center mb-12 gradient-text">What We Provide</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 smooth-transition hover:glow-effect">
              <BookOpen className="w-12 h-12 text-[#3AA0FF] mb-4" />
              <h4 className="text-xl mb-2 text-[#F5F7FA]">Precise Explanations</h4>
              <p className="text-[#9AA3B2]">Answers derived strictly from your uploaded notes</p>
            </div>
            <div className="glass-card p-6 smooth-transition hover:glow-effect">
              <Shield className="w-12 h-12 text-[#3AA0FF] mb-4" />
              <h4 className="text-xl mb-2 text-[#F5F7FA]">Zero Hallucination</h4>
              <p className="text-[#9AA3B2]">No guessing, only factual information from your notes</p>
            </div>
            <div className="glass-card p-6 smooth-transition hover:glow-effect">
              <Target className="w-12 h-12 text-[#3AA0FF] mb-4" />
              <h4 className="text-xl mb-2 text-[#F5F7FA]">Transparent Citations</h4>
              <p className="text-[#9AA3B2]">Every answer includes source file and page reference</p>
            </div>
            <div className="glass-card p-6 smooth-transition hover:glow-effect">
              <Zap className="w-12 h-12 text-[#3AA0FF] mb-4" />
              <h4 className="text-xl mb-2 text-[#F5F7FA]">Confidence Levels</h4>
              <p className="text-[#9AA3B2]">Know exactly how confident the AI is in each answer</p>
            </div>
          </div>

          {/* Three Modes */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card-strong p-8 smooth-transition hover:glow-effect text-center">
              <Brain className="w-16 h-16 text-[#3AA0FF] mb-4 mx-auto" />
              <h4 className="text-2xl mb-3 text-[#F5F7FA]">Exam Mode</h4>
              <p className="text-[#C7CCD6]">Practice with MCQs and short-answer questions generated from your notes</p>
            </div>
            <div className="glass-card-strong p-8 smooth-transition hover:glow-effect text-center">
              <BookOpen className="w-16 h-16 text-[#3AA0FF] mb-4 mx-auto" />
              <h4 className="text-2xl mb-3 text-[#F5F7FA]">Deep Research Mode</h4>
              <p className="text-[#C7CCD6]">Get detailed, comprehensive answers with extensive citations</p>
            </div>
            <div className="glass-card-strong p-8 smooth-transition hover:glow-effect text-center">
              <Trophy className="w-16 h-16 text-[#3AA0FF] mb-4 mx-auto" />
              <h4 className="text-2xl mb-3 text-[#F5F7FA]">Competitive Mode</h4>
              <p className="text-[#C7CCD6]">Earn points, build streaks, and climb the global leaderboard</p>
            </div>
          </div>
        </div>

        {/* Functional Requirements */}
        <div className="glass-card-strong p-10 mb-20">
          <h3 className="text-3xl mb-8 gradient-text text-center">How It Works</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E8CE6] flex items-center justify-center">1</div>
              <div>
                <h4 className="text-xl mb-2 text-[#F5F7FA]">Three Subject System</h4>
                <p className="text-[#C7CCD6]">Create exactly 3 subjects and upload your notes (PDF/TXT only). Multiple files per subject allowed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E8CE6] flex items-center justify-center">2</div>
              <div>
                <h4 className="text-xl mb-2 text-[#F5F7FA]">Subject-Scoped Q&A</h4>
                <p className="text-[#C7CCD6]">Select one subject at a time. AI answers strictly from that subject's notes—no cross-subject mixing.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E8CE6] flex items-center justify-center">3</div>
              <div>
                <h4 className="text-xl mb-2 text-[#F5F7FA]">Grounded Responses</h4>
                <p className="text-[#C7CCD6]">Every answer includes: file name citation, page/section reference, confidence level (High/Medium/Low), and supporting evidence snippet.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E8CE6] flex items-center justify-center">4</div>
              <div>
                <h4 className="text-xl mb-2 text-[#F5F7FA]">Strict Refusal Rule</h4>
                <p className="text-[#C7CCD6]">If the answer isn't in your notes, you'll see: "Not found in your notes for [Subject]" — No guessing allowed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E8CE6] flex items-center justify-center">5</div>
              <div>
                <h4 className="text-xl mb-2 text-[#F5F7FA]">Study Mode</h4>
                <p className="text-[#C7CCD6]">Generate 5 MCQs (with correct answers, explanations, and citations) plus 3 short-answer questions (with model answers and citations).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E8CE6] flex items-center justify-center">6</div>
              <div>
                <h4 className="text-xl mb-2 text-[#F5F7FA]">Video Suggestions</h4>
                <p className="text-[#C7CCD6]">After every AI response, get 2–3 relevant educational video recommendations to supplement your learning.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="glass-card p-8 text-center">
          <h3 className="text-2xl mb-4 gradient-text">Get in Touch</h3>
          <a
            href="mailto:Contact@AskMyNotes.com"
            className="text-[#3AA0FF] hover:text-[#6BB6FF] smooth-transition text-lg"
          >
            Contact@AskMyNotes.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[rgba(255,255,255,0.1)] py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#9AA3B2]">
          © 2026 AskMyNotes. All Rights Reserved.
        </div>
      </footer>

      {/* Login and Sign Up Dialogs */}
      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
      <LoginDialog open={showSignUp} onClose={() => setShowSignUp(false)} isSignUp />
    </div>
  );
}