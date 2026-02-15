import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/clearway-logo-new.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
      setIsLoading(false);
      return;
    }

    toast({ title: "Welcome back!", description: "Redirecting to your dashboard..." });
    navigate("/admin/leads");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/">
              <img src={logo} alt="Clearway AI" className="h-6 w-auto" />
            </Link>
          </div>

          {/* Login Card */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-foreground mb-1">Client Hub Login</h1>
              <p className="text-xs text-muted-foreground">Sign in to access your dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="bg-muted/50 border-border focus:border-primary h-10 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs">Password</Label>
                  <button
                    type="button"
                    className="text-[11px] text-primary hover:underline"
                    onClick={() =>
                      toast({
                        title: "Password Reset",
                        description: "Please email hello@clearwayai.co to reset your password.",
                      })
                    }
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-muted/50 border-border focus:border-primary h-10 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-5 rounded-xl btn-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Request access link */}
            <div className="mt-5 pt-4 border-t border-border/40 text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/request" className="text-primary hover:underline font-medium">
                  Request access
                </Link>
              </p>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/privacy" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="text-muted-foreground/30 text-[11px]">·</span>
            <Link to="/terms" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <a href="mailto:hello@clearwayai.co" className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-3 h-3" />
              hello@clearwayai.co
            </a>
            <a href="tel:+18887783091" className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-3 h-3" />
              +1 (888) 778-3091
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
