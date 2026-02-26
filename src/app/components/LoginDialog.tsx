import { useState } from "react";
import { useNavigate } from "react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  isSignUp?: boolean;
}

export function LoginDialog({ open, onClose, isSignUp = false }: LoginDialogProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    // Mock login - in real app, this would validate credentials
    login(username);
    onClose();
    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card-strong border-[rgba(255,255,255,0.2)] text-[#F5F7FA]">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {isSignUp ? "Sign Up" : "Login"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-[#C7CCD6]">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="glass-input"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-[#C7CCD6]">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="glass-input"
              required
            />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm mb-2 text-[#C7CCD6]">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm your password"
                className="glass-input"
                required
              />
            </div>
          )}
          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </Button>
            <Button type="submit" className="btn-primary">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
