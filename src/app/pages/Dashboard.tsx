import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Plus,
  Send,
  User,
  History as HistoryIcon,
  Trophy,
  LogOut,
  FileText,
  X,
  UploadCloud,
  Mic,
  Loader2,
  Target,
  Award,
  RotateCcw,
  CheckCircle,
  XCircle,
  Sparkles,
  Brain,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { getSampleAnswer } from "../../lib/sampleQA";
import { mathsQuiz, QuizQuestion } from "../../lib/quizData";

interface Subject {
  id: string;
  name: string;
  description?: string;
  files: File[];
}

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  isAnalyzing?: boolean;
  isTyping?: boolean;
}

// TypingText component - shows text being typed character by character
function TypingText({ content, onComplete }: { content: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let index = 0;
    const speed = 15;
    
    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayed(content.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [content, onComplete]);
  
  return <>{displayed}</>;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mode, setMode] = useState<"exam" | "research" | "competitive">("exam");
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [rankType, setRankType] = useState<"university" | "regional" | "global">("university");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Challenge Mode state
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<{question: QuizQuestion, selected: number, correct: boolean}[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const username = "Student123";
  const ranks = { university: 15, regional: 142, global: 8421 };

  // Initialize speech synthesis
  useEffect(() => {
    // Load voices (needed for some browsers)
    window.speechSynthesis.getVoices();
  }, []);

  // Speak the given text using Web Speech API
  const speakText = (text: string) => {
    if (!text) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties for natural-sounding voice
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-') && v.name.includes('Google')) 
      || voices.find(v => v.lang.startsWith('en-'))
      || voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Toggle voice mode
  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      setIsVoiceEnabled(!isVoiceEnabled);
      
      // If enabling voice, speak the last response if available
      if (!isVoiceEnabled) {
        const lastAssistantMsg = [...messages].reverse().find(m => m.type === "assistant" && !m.isTyping && !m.isAnalyzing);
        if (lastAssistantMsg) {
          speakText(lastAssistantMsg.content);
        }
      } else {
        stopSpeaking();
      }
    }
  };

  // Manual speak button
  const toggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const lastAssistantMsg = [...messages].reverse().find(m => m.type === "assistant" && !m.isTyping && !m.isAnalyzing);
      if (lastAssistantMsg) {
        speakText(lastAssistantMsg.content);
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRankType((prev) =>
        prev === "university" ? "regional" : prev === "regional" ? "global" : "university"
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startChallengeMode = () => {
    setIsChallengeMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions([]);
    stopSpeaking();
  };

  const exitChallengeMode = () => {
    setIsChallengeMode(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions([]);
    stopSpeaking();
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    const currentQuestion = mathsQuiz[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: isCorrect
    }]);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mathsQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions([]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedSubject) return;
    const userMsg: Message = { id: Date.now().toString(), type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsAnalyzing(true);
    stopSpeaking();
    
    // Use sample answers from notes
    const response = getSampleAnswer(inputMessage);
    const finalResponse = response || "I don't have an answer for that question. Try asking about slopes, y-intercepts, or vertical lines in math!";
    
    // Show "Analyzing your notes..." loading
    setTimeout(() => {
      // Add analyzing message
      const analyzingMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        type: "assistant", 
        content: finalResponse,
        isAnalyzing: true 
      };
      setMessages((prev) => [...prev, analyzingMsg]);
      setIsAnalyzing(false);
      
      // After a delay, show typing animation
      setTimeout(() => {
        setMessages((prev) => 
          prev.map(m => 
            m.isAnalyzing ? { ...m, isAnalyzing: false, isTyping: true } : m
          )
        );
      }, 500);
      
    }, 1200);
  };

  // When typing completes, speak if voice is enabled
  const handleTypingComplete = (messageId: string) => {
    setMessages((prev) => 
      prev.map(m => 
        m.id === messageId ? { ...m, isTyping: false } : m
      )
    );
    
    // Find the completed message and speak it
    const msg = messages.find(m => m.id === messageId);
    if (msg && isVoiceEnabled) {
      speakText(msg.content);
    }
  };

  const handleAddSubjectFinal = (name: string, description: string, files: File[]) => {
    const newSub: Subject = { id: Date.now().toString(), name, description, files };
    setSubjects([...subjects, newSub]);
    setShowAddSubject(false);
  };

  // Analyzing indicator component
  const AnalyzingIndicator = () => (
    <div className="flex items-center gap-3 px-2 py-1">
      <Brain className="w-5 h-5 text-[#3AA0FF] animate-pulse" />
      <span className="text-sm text-gray-300">Analyzing your notes</span>
      <div className="flex gap-1">
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
      </div>
    </div>
  );

  return (
    <div className="gradient-bg h-screen text-[#F5F7FA] flex overflow-hidden">
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-10 transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(46, 140, 230, 0.15) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
        }}
      />
      <aside className="w-80 h-full border-r border-white/10 p-6 z-40 flex flex-col glass-card-strong shrink-0">
        <div className="glass-card p-4 mb-6">
          <div className="text-lg mb-2 font-semibold">{username}</div>
          <div className="flex items-center gap-2 text-sm mb-4 text-[#3AA0FF]">
            <Trophy className="w-4 h-4" />
            <span>RANK #{rankType === "university" ? ranks.university : rankType === "regional" ? ranks.regional : ranks.global}</span>
          </div>
          <div className="flex gap-2 mb-2">
            <button onClick={() => navigate("/profile")} className="btn-secondary flex-1 py-2 px-1 flex items-center justify-center gap-1 text-xs">
              <User className="w-3.5 h-3.5" /> Profile
            </button>
            <button onClick={() => navigate("/history")} className="btn-secondary flex-1 py-2 px-1 flex items-center justify-center gap-1 text-xs">
              <HistoryIcon className="w-3.5 h-3.5" /> History
            </button>
          </div>
          <button onClick={() => logout()} className="btn-secondary w-full py-2 flex items-center justify-center gap-2 text-xs">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xs text-[#9AA3B2] mb-3 uppercase tracking-widest">Subjects ({subjects.length}/3)</h3>
          <div className="space-y-2">
            {subjects.map((s) => (
              <button key={s.id} onClick={() => setSelectedSubject(s.id)} className={`w-full p-3 rounded-lg text-left text-sm transition-all ${selectedSubject === s.id ? "bg-[#3AA0FF]/20 border border-[#3AA0FF]" : "bg-white/5 hover:bg-white/10"}`}>
                <div className="font-medium">{s.name}</div>
                <div className="text-[10px] text-gray-400">{s.files.length} files attached</div>
              </button>
            ))}
            {subjects.length < 3 && (
              <button onClick={() => setShowAddSubject(true)} className="w-full p-4 border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center gap-2 text-sm hover:bg-white/5 transition-colors">
                <Plus className="w-5 h-5 text-[#3AA0FF]" />
                <span className="text-gray-300">Add Subject</span>
              </button>
            )}
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col relative z-20 overflow-hidden bg-black/10">
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {isChallengeMode ? (
            <ChallengeModeQuiz
              quizComplete={quizComplete}
              score={score}
              currentQuestionIndex={currentQuestionIndex}
              selectedAnswer={selectedAnswer}
              showAnswer={showAnswer}
              answeredQuestions={answeredQuestions}
              onAnswerSelect={handleAnswerSelect}
              onSubmitAnswer={handleSubmitAnswer}
              onNextQuestion={handleNextQuestion}
              onRestart={handleRestartQuiz}
              onExit={exitChallengeMode}
            />
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
              <h2 className="text-6xl font-bold gradient-text">Hello @{username}</h2>
              <p className="mt-4 text-lg">Upload your notes to start the AI analysis.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4 pb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${m.type === "user" ? "bg-[#3AA0FF] text-white" : "glass-card text-white border border-white/5"}`}>
                    {m.isAnalyzing ? (
                      <AnalyzingIndicator />
                    ) : m.isTyping ? (
                      <TypingText content={m.content} onComplete={() => handleTypingComplete(m.id)} />
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <div className="p-6 bg-[#0B121E]/90 backdrop-blur-2xl border-t border-white/10 shrink-0">
          <div className="max-w-4xl mx-auto flex gap-4 items-end">
            <div className="flex-1">
              <div className="flex gap-2 mb-4">
                {["exam", "research", "competitive"].map((m) => (
                  <button key={m} onClick={() => {
                    if (m === "competitive") { startChallengeMode(); } 
                    else { setMode(m as any); if (isChallengeMode) exitChallengeMode(); }
                  }} className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all ${
                    (mode === m && !isChallengeMode) ? "bg-[#3AA0FF] text-white" : m === "competitive" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-white/5 text-gray-400 hover:text-white"
                  }`}>
                    {m === "competitive" ? "CHALLENGE" : m.toUpperCase()} MODE
                  </button>
                ))}
              </div>
              {isChallengeMode ? (
                <div className="text-center text-sm text-gray-400 py-2">Challenge Mode Active - Test your knowledge!</div>
              ) : (
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} placeholder={selectedSubject ? "Ask anything about your notes..." : "Select a subject from the sidebar..."} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#3AA0FF] transition-all placeholder:text-gray-500" disabled={!selectedSubject || isAnalyzing} />
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* Voice button - toggles voice on/off and speaks on click */}
              {!isChallengeMode && messages.length > 0 && (
                <button onClick={toggleSpeak} disabled={isAnalyzing} className={`p-3 rounded-xl transition-all shadow-lg flex items-center justify-center ${isSpeaking ? "bg-green-500 animate-pulse" : "bg-white/90 hover:bg-white"} disabled:opacity-30 disabled:cursor-not-allowed`} title={isSpeaking ? "Stop Speaking" : "Speak Response"}>
                  {isSpeaking ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-[#0B121E]" />}
                </button>
              )}
              {!isChallengeMode && (
                <button onClick={toggleVoice} disabled={!selectedSubject || isAnalyzing} className={`p-3 rounded-xl transition-all shadow-lg flex items-center justify-center ${isVoiceEnabled ? "bg-[#3AA0FF]" : "bg-white/90 hover:bg-white"} disabled:opacity-30 disabled:cursor-not-allowed`} title={isVoiceEnabled ? "Voice ON - Click to disable" : "Enable Voice"}>
                  <Mic className={`w-5 h-5 ${isVoiceEnabled ? "text-white" : "text-[#0B121E]"}`} />
                </button>
              )}
              {!isChallengeMode ? (
                <button onClick={handleSendMessage} disabled={!selectedSubject || !inputMessage.trim() || isAnalyzing} className="p-3.5 bg-[#3AA0FF] hover:bg-[#2E8CE6] rounded-xl transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center">
                  {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              ) : (
                <button onClick={exitChallengeMode} className="p-3.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-lg text-white flex items-center justify-center" title="Exit Challenge Mode">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <AddSubjectDialog open={showAddSubject} onClose={() => setShowAddSubject(false)} onAdd={handleAddSubjectFinal} />
    </div>
  );
}

function ChallengeModeQuiz({ quizComplete, score, currentQuestionIndex, selectedAnswer, showAnswer, answeredQuestions, onAnswerSelect, onSubmitAnswer, onNextQuestion, onRestart, onExit }: {
  quizComplete: boolean; score: number; currentQuestionIndex: number; selectedAnswer: number | null; showAnswer: boolean;
  answeredQuestions: {question: QuizQuestion, selected: number, correct: boolean}[];
  onAnswerSelect: (index: number) => void; onSubmitAnswer: () => void; onNextQuestion: () => void;
  onRestart: () => void; onExit: () => void;
}) {
  const currentQuestion = mathsQuiz[currentQuestionIndex];
  const totalQuestions = mathsQuiz.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  if (quizComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-card-strong rounded-3xl p-8 text-center">
          <div className="mb-6">
            {percentage >= 80 ? <Award className="w-24 h-24 mx-auto text-yellow-400 animate-bounce" /> : percentage >= 50 ? <Award className="w-24 h-24 mx-auto text-gray-300" /> : <Target className="w-24 h-24 mx-auto text-red-400" />}
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-4">{percentage >= 80 ? "Excellent!" : percentage >= 50 ? "Good Job!" : "Keep Practicing!"}</h2>
          <div className="text-6xl font-bold text-white mb-2">{score}/{totalQuestions}</div>
          <div className="text-gray-400 mb-8">{percentage}% Correct</div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-500/20 rounded-xl p-4"><div className="text-2xl font-bold text-green-400">{answeredQuestions.filter(q => q.correct).length}</div><div className="text-xs text-gray-400">Correct</div></div>
            <div className="bg-red-500/20 rounded-xl p-4"><div className="text-2xl font-bold text-red-400">{answeredQuestions.filter(q => !q.correct).length}</div><div className="text-xs text-gray-400">Incorrect</div></div>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={onRestart} className="px-6 py-3 bg-[#3AA0FF] hover:bg-[#2E8CE6] rounded-xl flex items-center gap-2 transition-all"><RotateCcw className="w-5 h-5" />Try Again</button>
            <button onClick={onExit} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-2 transition-all">Exit Challenge</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span><span>Score: {score}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }} />
        </div>
      </div>
      <div className="glass-card-strong rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-6"><Sparkles className="w-5 h-5 text-purple-400" /><span className="text-purple-400 text-sm font-medium">Challenge Question</span></div>
        <h3 className="text-xl font-semibold text-white mb-8 leading-relaxed">{currentQuestion.question}</h3>
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            let buttonClass = "w-full p-4 rounded-xl text-left transition-all border-2 ";
            if (showAnswer) {
              if (isCorrect) buttonClass += "border-green-500 bg-green-500/20 text-green-400";
              else if (isSelected && !isCorrect) buttonClass += "border-red-500 bg-red-500/20 text-red-400";
              else buttonClass += "border-white/10 bg-white/5 text-gray-400";
            } else {
              buttonClass += isSelected ? "border-[#3AA0FF] bg-[#3AA0FF]/20 text-white" : "border-white/10 bg-white/5 text-gray-300 hover:border-[#3AA0FF]/50 hover:bg-white/10";
            }
            return (
              <button key={index} onClick={() => onAnswerSelect(index)} disabled={showAnswer} className={buttonClass}>
                <div className="flex items-center justify-between"><span>{option}</span>{showAnswer && isCorrect && <CheckCircle className="w-5 h-5" />}{showAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}</div>
              </button>
            );
          })}
        </div>
        <div className="flex justify-end">
          {!showAnswer ? (
            <button onClick={onSubmitAnswer} disabled={selectedAnswer === null} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed">Submit Answer</button>
          ) : (
            <button onClick={onNextQuestion} className="px-8 py-3 bg-[#3AA0FF] hover:bg-[#2E8CE6] rounded-xl font-semibold transition-all flex items-center gap-2">
              {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "See Results"}<Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AddSubjectDialog({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (n: string, d: string, f: File[]) => void; }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) { setFiles([...files, ...Array.from(e.target.files)]); } };
  const removeFile = (index: number) => { setFiles(files.filter((_, i) => i !== index)); };
  const handleSubmit = () => { if (name.trim()) { onAdd(name, desc, files); setName(""); setDesc(""); setFiles([]); } };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B121E] text-white border border-white/10 max-w-md">
        <DialogHeader><DialogTitle className="text-xl font-bold">New Subject Details</DialogTitle></DialogHeader>
        <div className="space-y-4 mt-4">
          <div><label className="text-xs text-gray-400 mb-1 block">Subject Name</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Quantum Physics" className="bg-white/5 border-white/10" /></div>
          <div><label className="text-xs text-gray-400 mb-1 block">Description (Optional)</label><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What is this subject about?" className="bg-white/5 border-white/10 min-h-[80px]" /></div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Subject Notes</label>
            <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 hover:border-[#3AA0FF]/50 transition-all">
              <UploadCloud className="w-8 h-8 text-[#3AA0FF]" /><span className="text-sm text-gray-300">Click to upload or drag & drop</span><span className="text-[10px] text-gray-500">PDF, TXT, DOCX supported</span>
            </div>
            {files.length > 0 && (
              <div className="mt-3 space-y-2 max-h-[120px] overflow-y-auto pr-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 overflow-hidden"><FileText className="w-3.5 h-3.5 text-[#3AA0FF] shrink-0" /><span className="text-xs truncate">{f.name}</span></div>
                    <button onClick={() => removeFile(i)} className="text-gray-500 hover:text-red-400"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="ghost" onClick={onClose} className="text-gray-400">Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()} className="bg-[#3AA0FF] hover:bg-[#2E8CE6] px-8">Create Subject</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
