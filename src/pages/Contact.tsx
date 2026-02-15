import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Mail, Phone, Eye, EyeOff, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
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

const businessTypes = [
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

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
    message: "",
  });

  const passwordChecks = [
    { label: "At least 10 characters", test: (p: string) => p.length >= 10 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
    { label: "One special character (@, !, #, etc.)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  const allPasswordChecksPassed = passwordChecks.every((c) => c.test(formData.password));
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.email.trim()) missing.push("Work Email");
    if (!allPasswordChecksPassed) missing.push("Password (must meet all requirements)");
    if (!passwordsMatch) missing.push("Passwords must match");

    if (missing.length > 0) {
      toast({
        title: "Please complete the required fields",
        description: missing.join(", "),
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent({ event_name: "form_submit", event_category: "form", metadata: { form: "signup" } });

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: formData.name.trim(),
            business_type: formData.businessType || undefined,
            business_name: formData.businessName || undefined,
          },
        },
      });

      if (signUpError) {
        if (!signUpError.message.includes("already registered")) {
          throw signUpError;
        }
      }

      // Send contact email notification
      const submitData = {
        ...formData,
        message: formData.message || "New Client Hub signup",
        callVolume: "",
        website: "",
        preferredContact: "email",
      };

      await supabase.functions.invoke("send-contact-email", {
        body: submitData,
      });

      trackEvent({ event_name: "form_success", event_category: "form", metadata: { form: "signup" } });
      navigate("/contact/success");
    } catch (error: any) {
      console.error("Signup error:", error);
      trackEvent({ event_name: "form_error", event_category: "form", metadata: { form: "signup" } });
      toast({
        title: "Something went wrong",
        description: "Please try again or email us at hello@clearwayai.co",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoNumber = "+1 (888) 778-3091";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
            {/* LEFT — Trust Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:flex lg:col-span-4 flex-col gap-4"
            >
              {/* Client Hub info */}
              <div className="glass-card p-5 rounded-xl">
                <h2 className="text-sm font-semibold text-foreground mb-3">Client Hub Access</h2>
                <ul className="space-y-2.5">
                  {[
                    "Create your login to access your portal.",
                    "We'll email a verification link after signup.",
                    "Security options and controls vary by plan and configuration.",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact card */}
              <div className="glass-card p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-semibold text-foreground">Questions?</h3>
                <a
                  href="mailto:hello@clearwayai.co"
                  className="flex items-center gap-2 text-xs text-primary hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  hello@clearwayai.co
                </a>
                <a
                  href={`tel:${demoNumber.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  {demoNumber}
                </a>
              </div>
            </motion.div>

            {/* RIGHT — Signup Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="glass-card p-5 md:p-6 rounded-2xl">
                {/* Header */}
                <div className="mb-5">
                  <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                    Create Your <span className="gradient-text">Client Hub</span> Account
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Sign up to access your dashboard and portal tools.
                  </p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-5">
                  <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Step 1 of 2 — Account Details</p>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="name" className="text-xs">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Jane Smith"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            className="bg-muted/50 border-border focus:border-primary h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="email" className="text-xs">Work Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="jane@smileclinic.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            maxLength={255}
                            className="bg-muted/50 border-border focus:border-primary h-9 text-sm"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-1">
                        <Label htmlFor="password" className="text-xs">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 10 characters; avoid common passwords"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={10}
                            maxLength={72}
                            className="bg-muted/50 border-border focus:border-primary h-9 text-sm pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {formData.password.length > 0 && (
                          <ul className="mt-1.5 space-y-0.5">
                            {passwordChecks.map((check) => (
                              <li
                                key={check.label}
                                className={`flex items-center gap-1 text-[10px] ${check.test(formData.password) ? "text-primary" : "text-muted-foreground"}`}
                              >
                                <CheckCircle2 className={`w-3 h-3 ${check.test(formData.password) ? "text-primary" : "text-muted-foreground/40"}`} />
                                {check.label}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-1">
                        <Label htmlFor="confirmPassword" className="text-xs">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            maxLength={72}
                            className={`bg-muted/50 border-border focus:border-primary h-9 text-sm pr-10 ${formData.confirmPassword.length > 0 ? (passwordsMatch ? "border-primary" : "border-destructive") : ""}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {formData.confirmPassword.length > 0 && !passwordsMatch && (
                          <p className="text-[10px] text-destructive">Passwords don't match</p>
                        )}
                        {passwordsMatch && (
                          <p className="text-[10px] text-primary flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Passwords match
                          </p>
                        )}
                      </div>

                      {/* Trust device */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={trustDevice}
                          onCheckedChange={(checked) => setTrustDevice(checked === true)}
                          className="h-3.5 w-3.5"
                        />
                        <span className="text-xs text-muted-foreground">Trust this device for 30 days</span>
                      </label>

                      <Button
                        type="button"
                        onClick={handleContinue}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-5 rounded-xl btn-glow"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Step 2 of 2 — Business Details (Optional)</p>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          Back
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="businessName" className="text-xs">Business Name</Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            placeholder="Smile Dental Clinic"
                            value={formData.businessName}
                            onChange={handleChange}
                            maxLength={100}
                            className="bg-muted/50 border-border focus:border-primary h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Industry</Label>
                          <Select
                            value={formData.businessType}
                            onValueChange={(value) => handleSelectChange("businessType", value)}
                          >
                            <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-9 text-sm">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border max-h-60">
                              {businessTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Time Zone</Label>
                          <Select
                            value={formData.timezone}
                            onValueChange={(value) => handleSelectChange("timezone", value)}
                          >
                            <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-9 text-sm">
                              <SelectValue placeholder="Auto-detected if blank" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border max-h-60">
                              {timezoneOptions.map((tz) => (
                                <SelectItem key={tz} value={tz}>
                                  {tz}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="phone" className="text-xs">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={20}
                            className="bg-muted/50 border-border focus:border-primary h-9 text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="message" className="text-xs">Notes</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Anything we should know about your setup..."
                          value={formData.message}
                          onChange={handleChange}
                          maxLength={1000}
                          rows={2}
                          className="bg-muted/50 border-border focus:border-primary resize-none text-sm"
                        />
                      </div>

                      <div className="space-y-3 pt-1">
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-5 rounded-xl btn-glow"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Creating Account..." : "Create Account"}
                          <Send className="w-4 h-4 ml-2" />
                        </Button>
                        <div className="text-center space-y-0.5">
                          <p className="text-[10px] text-muted-foreground">We'll email you a verification link.</p>
                          <p className="text-[10px] text-muted-foreground">No spam. Unsubscribe anytime.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Mobile trust info */}
              <div className="mt-4 glass-card p-4 rounded-xl lg:hidden">
                <h3 className="text-xs font-semibold text-foreground mb-2">Client Hub Access</h3>
                <ul className="space-y-2">
                  {[
                    "Create your login to access your portal.",
                    "We'll email a verification link after signup.",
                    "Security options and controls vary by plan and configuration.",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <a href="mailto:hello@clearwayai.co" className="text-xs text-primary hover:underline">
                    hello@clearwayai.co
                  </a>
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

export default Contact;
