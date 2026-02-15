import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  LogIn,
  MessageSquare,
  Shield,
  Eye,
  EyeOff,
  UserPlus,
  MailCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const industryOptions = [
  "Dental Practice",
  "Medical Practice",
  "Law Firm",
  "Home Services (Plumbing, HVAC, etc.)",
  "Real Estate",
  "Salon / Spa",
  "Insurance Agency",
  "Accounting / Tax Services",
  "Auto Shop / Mechanic",
  "Consulting / Agency",
  "Other",
];

const timezoneOptions = [
  "United States – Eastern (ET)",
  "United States – Central (CT)",
  "United States – Mountain (MT)",
  "United States – Pacific (PT)",
  "Canada",
  "United Kingdom",
  "Europe (CET)",
  "Australia",
  "Other",
];

const planOptions = [
  "Solo Launch – $1,500/mo",
  "Pro Practice – $2,500/mo",
  "Team Pro – $3,500/mo",
  "Concierge AI – $5,000+/mo",
  "Not sure yet",
];

const serviceOptions = [
  "AI Receptionist (24/7 phone answering)",
  "Email Automation (Lead-to-deal)",
  "Both",
  "Not sure yet",
];

const commitmentOptions = [
  "Monthly",
  "1 Year (10% discount)",
  "36 Months (20% discount)",
  "Not sure yet",
];

const callVolumeOptions = [
  "1–10 calls/day",
  "11–30 calls/day",
  "31–50 calls/day",
  "51–100 calls/day",
  "100+ calls/day",
  "Not sure",
];

type PasswordStrength = "weak" | "ok" | "strong";

const getPasswordStrength = (pw: string): PasswordStrength => {
  if (pw.length < 10) return "weak";
  let score = 0;
  if (/[a-z]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (pw.length >= 14) score++;
  return score >= 3 ? "strong" : "ok";
};

const strengthConfig: Record<PasswordStrength, { label: string; color: string; width: string }> = {
  weak: { label: "Weak", color: "bg-destructive", width: "w-1/3" },
  ok: { label: "OK", color: "bg-warning", width: "w-2/3" },
  strong: { label: "Strong", color: "bg-success", width: "w-full" },
};

const Request = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    timezone: "",
    phone: "",
    notes: "",
    plan: "",
    service: "",
    commitment: "",
    callVolume: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordStrength = useMemo(
    () => (formData.password ? getPasswordStrength(formData.password) : null),
    [formData.password]
  );

  const handleStep1 = useCallback(() => {
    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.email.trim()) missing.push("Work Email");
    if (!formData.password) missing.push("Password");
    if (!formData.confirmPassword) missing.push("Confirm Password");

    if (missing.length > 0) {
      toast({ title: "Please complete the required fields", description: missing.join(", "), variant: "destructive" });
      return;
    }

    if (formData.password.length < 10) {
      toast({ title: "Password too short", description: "Minimum 10 characters required.", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please make sure both passwords are the same.", variant: "destructive" });
      return;
    }

    trackEvent({ event_name: "signup_step1_complete", event_category: "form", metadata: { form: "request" } });
    setStep(2);
  }, [formData, toast]);

  const handleStep2 = useCallback(() => {
    trackEvent({ event_name: "signup_step2_complete", event_category: "form", metadata: { form: "request" } });
    setStep(3);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent({ event_name: "form_submit", event_category: "form", metadata: { form: "request" } });

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: formData.name.trim(),
            business_name: formData.businessName.trim(),
            industry: formData.businessType,
            timezone: formData.timezone,
            phone: formData.phone.trim(),
            plan: formData.plan,
            service: formData.service,
            commitment: formData.commitment,
            call_volume: formData.callVolume,
          },
        },
      });

      if (signUpError) throw signUpError;

      await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          businessName: formData.businessName.trim(),
          businessType: formData.businessType || "Account signup",
          phone: formData.phone.trim(),
          website: "",
          timezone: formData.timezone,
          callVolume: formData.callVolume,
          preferredContact: "email",
          message: `[Account Signup]\nPlan: ${formData.plan || "Not selected"}\nService: ${formData.service || "Not selected"}\nCommitment: ${formData.commitment || "Not selected"}\nCall Volume: ${formData.callVolume || "Not provided"}\nNotes: ${formData.notes.trim() || "None"}`,
          formType: "signup" as const,
          service: formData.service,
          term: formData.commitment,
        },
      });

      trackEvent({ event_name: "form_success", event_category: "form", metadata: { form: "request" } });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Signup error:", error);
      trackEvent({ event_name: "form_error", event_category: "form", metadata: { form: "request" } });
      toast({
        title: "Something went wrong",
        description: error?.message || "Please try again or email us at hello@clearwayai.co",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "bg-muted/60 border-border/50 focus:border-primary h-9 text-sm";

  // ── Success state ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="elevated-card p-8 md:p-10 rounded-2xl relative overflow-hidden border border-border/40 bg-card/80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <MailCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
                  <p className="text-sm text-muted-foreground mb-8">
                    We sent a verification link to <span className="text-foreground font-medium">{formData.email}</span> to complete setup.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" size="default" className="flex-1 btn-glow" asChild>
                      <a href="https://hub-clearwayai.com/login" target="_blank" rel="noopener noreferrer">
                        Back to Sign in
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      className="flex-1 gap-2"
                      onClick={() => {
                        toast({ title: "Verification email resent", description: "Check your inbox and spam folder." });
                      }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Resend email
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-1.5">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <a href="mailto:hello@clearwayai.co" className="text-[11px] text-primary hover:underline">
                  hello@clearwayai.co
                </a>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Main page ──
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <main className="pt-28 pb-16 relative">
        <div className="container mx-auto px-4">
          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-6"
          >
            <p className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              Client Hub Access
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-3 leading-tight">
              Create Your{" "}
              <span className="gradient-text">Client Hub Account</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-xl mx-auto">
              Create an account to access your dashboard and portal tools.
            </p>
          </motion.div>

          {/* ── 3-step row ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md mx-auto mb-10"
          >
            <div className="flex items-center justify-between">
              {[
                { icon: UserPlus, label: "Create account", active: step >= 1 },
                { icon: MailCheck, label: "Verify email", active: false },
                { icon: CheckCircle2, label: "Access your portal", active: false },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <div className="flex-1 h-px bg-border/40 mx-2" />
                  )}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        item.active
                          ? "bg-primary/15 border border-primary/30"
                          : "bg-muted/40 border border-border/40"
                      }`}
                    >
                      <item.icon
                        className={`w-3.5 h-3.5 ${item.active ? "text-primary" : "text-muted-foreground/50"}`}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-medium ${
                        item.active ? "text-foreground/80" : "text-muted-foreground/50"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* ── 2-Column Layout ── */}
          <div className="grid lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
            {/* LEFT — Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1"
            >
              {/* Already have an account? */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <LogIn className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">Already have an account?</h3>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <a href="https://hub-clearwayai.com/login" target="_blank" rel="noopener noreferrer">
                    Sign in
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>

              {/* Need help? */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">Need help?</h3>
                </div>
                <div className="space-y-2.5">
                  <a
                    href="mailto:hello@clearwayai.co"
                    className="flex items-center gap-2 text-[12px] text-primary hover:underline font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    hello@clearwayai.co
                  </a>
                  <a
                    href="tel:+18887783091"
                    className="flex items-center gap-2 text-[12px] text-foreground/80 hover:text-primary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    +1 (888) 778-3091
                  </a>
                </div>
                <p className="text-[10px] text-muted-foreground/50 mt-3">
                  Contact us if you have questions before signing up.
                </p>
              </div>

              {/* Account security */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">Account security</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Email verification helps protect access.",
                    "You can manage devices and sign out anytime.",
                    "Security options can vary by plan and configuration.",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="text-[11px] text-muted-foreground/70 leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* RIGHT — Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8 order-1 lg:order-2"
            >
              <div className="elevated-card p-5 md:p-6 rounded-2xl relative overflow-hidden border border-border/40 bg-card/80 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.04] rounded-full blur-[60px] pointer-events-none" />

                <div className="relative">
                  {/* Form header */}
                  <div className="mb-5">
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">Create Account</h2>
                    <p className="text-xs text-muted-foreground/70">
                      Use your work email. We'll send a verification link.
                    </p>
                  </div>

                  {/* Step indicator */}
                  <div className="flex items-center gap-3 mb-5">
                    {[
                      { num: 1, label: "Account" },
                      { num: 2, label: "Business details" },
                      { num: 3, label: "Service preferences" },
                    ].map((s, i) => (
                      <React.Fragment key={s.num}>
                        {i > 0 && <div className="flex-1 h-px bg-border/40" />}
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              step === s.num
                                ? "bg-primary text-primary-foreground"
                                : step > s.num
                                ? "bg-primary/15 text-primary"
                                : "bg-muted/40 text-muted-foreground/50"
                            }`}
                          >
                            {step > s.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.num}
                          </div>
                          <span className={`text-xs font-medium hidden sm:inline ${step === s.num ? "text-foreground" : "text-muted-foreground/50"}`}>
                            {s.label}
                          </span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          {/* Name + Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label htmlFor="name" className="text-xs font-medium text-foreground/80">Full Name *</Label>
                              <Input
                                id="name"
                                name="name"
                                placeholder="Jane Smith"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className={inputClass}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor="email" className="text-xs font-medium text-foreground/80">Work Email *</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                maxLength={255}
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-xs font-medium text-foreground/80">Create Password *</Label>
                            <div className="relative">
                              <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                maxLength={128}
                                className={`${inputClass} pr-10`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            {formData.password && passwordStrength && (
                              <div className="space-y-1">
                                <div className="h-1 bg-muted/60 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${strengthConfig[passwordStrength].color} ${strengthConfig[passwordStrength].width}`}
                                  />
                                </div>
                                <p className="text-[10px] text-muted-foreground/60">
                                  Strength: <span className="font-medium text-foreground/70">{strengthConfig[passwordStrength].label}</span>
                                </p>
                              </div>
                            )}
                            <p className="text-[10px] text-muted-foreground/50">
                              Minimum 10 characters. Avoid common passwords.
                            </p>
                          </div>

                          {/* Confirm Password */}
                          <div className="space-y-1.5">
                            <Label htmlFor="confirmPassword" className="text-xs font-medium text-foreground/80">
                              Confirm Password *
                            </Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                maxLength={128}
                                className={`${inputClass} pr-10`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                              >
                                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {/* Trust device */}
                          <div className="flex items-center gap-2.5">
                            <Checkbox
                              id="trustDevice"
                              checked={trustDevice}
                              onCheckedChange={(checked) => setTrustDevice(checked === true)}
                              className="border-border/60"
                            />
                            <label
                              htmlFor="trustDevice"
                              className="text-[11px] text-muted-foreground/70 cursor-pointer"
                            >
                              Trust this device for 30 days
                            </label>
                          </div>

                          {/* Continue */}
                          <div className="pt-1">
                            <Button
                              type="button"
                              onClick={handleStep1}
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-4 rounded-xl btn-glow"
                            >
                              Continue
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <p className="text-[11px] text-muted-foreground/60 -mt-1 mb-1">
                            Optional — helps us personalize your experience.
                          </p>

                          {/* Business Name + Industry */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label htmlFor="businessName" className="text-xs font-medium text-foreground/80">Business Name</Label>
                              <Input
                                id="businessName"
                                name="businessName"
                                placeholder="Acme Corp"
                                value={formData.businessName}
                                onChange={handleChange}
                                maxLength={100}
                                className={inputClass}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Industry</Label>
                              <Select
                                value={formData.businessType}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                              >
                                <SelectTrigger className={inputClass}>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border max-h-60">
                                  {industryOptions.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Timezone + Phone */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Time Zone</Label>
                              <Select
                                value={formData.timezone}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, timezone: value }))}
                              >
                                <SelectTrigger className={inputClass}>
                                  <SelectValue placeholder="Auto-detected if blank" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border max-h-60">
                                  {timezoneOptions.map((tz) => (
                                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor="phone" className="text-xs font-medium text-foreground/80">Phone</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={20}
                                className={inputClass}
                              />
                            </div>
                          </div>

                          {/* Notes */}
                          <div className="space-y-1.5">
                            <Label htmlFor="notes" className="text-xs font-medium text-foreground/80">Notes</Label>
                            <Textarea
                              id="notes"
                              name="notes"
                              placeholder="Anything we should know about your setup..."
                              value={formData.notes}
                              onChange={handleChange}
                              maxLength={1000}
                              rows={3}
                              className="bg-muted/60 border-border/50 focus:border-primary resize-none text-sm"
                            />
                          </div>

                          {/* Buttons */}
                          <div className="flex flex-col gap-3 pt-1">
                            <Button
                              type="button"
                              onClick={handleStep2}
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-4 rounded-xl btn-glow"
                            >
                              Continue
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-muted-foreground/60 hover:text-foreground"
                              onClick={() => setStep(1)}
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              Back to account details
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <p className="text-[11px] text-muted-foreground/60 -mt-1 mb-1">
                            Optional — helps us recommend the right setup for you.
                          </p>

                          {/* Service + Plan */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Service Interest</Label>
                              <Select
                                value={formData.service}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
                              >
                                <SelectTrigger className={inputClass}>
                                  <SelectValue placeholder="Select service" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border max-h-60">
                                  {serviceOptions.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Preferred Plan</Label>
                              <Select
                                value={formData.plan}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, plan: value }))}
                              >
                                <SelectTrigger className={inputClass}>
                                  <SelectValue placeholder="Select plan" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border max-h-60">
                                  {planOptions.map((p) => (
                                    <SelectItem key={p} value={p}>{p}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Commitment + Call Volume */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Commitment Term</Label>
                              <Select
                                value={formData.commitment}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, commitment: value }))}
                              >
                                <SelectTrigger className={inputClass}>
                                  <SelectValue placeholder="Select term" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border max-h-60">
                                  {commitmentOptions.map((c) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Daily Call Volume</Label>
                              <Select
                                value={formData.callVolume}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, callVolume: value }))}
                              >
                                <SelectTrigger className={inputClass}>
                                  <SelectValue placeholder="Estimated calls/day" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border max-h-60">
                                  {callVolumeOptions.map((v) => (
                                    <SelectItem key={v} value={v}>{v}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Buttons */}
                          <div className="flex flex-col gap-3 pt-1">
                            <Button
                              type="submit"
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-4 rounded-xl btn-glow"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Creating account..." : "Create Account"}
                              {!isSubmitting && <UserPlus className="w-4 h-4 ml-2" />}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-muted-foreground/60 hover:text-foreground"
                              onClick={() => setStep(2)}
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              Back to business details
                            </Button>
                          </div>

                          <div className="text-center space-y-0.5 pt-1">
                            <p className="text-[10px] text-muted-foreground/50">
                              We'll email you a verification link.
                            </p>
                            <p className="text-[10px] text-muted-foreground/50">
                              No spam.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Request;
