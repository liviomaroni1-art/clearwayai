import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  LogIn,
  MessageSquare,
  Info,
  ClipboardCheck,
  MailCheck,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const reasonOptions = [
  "Request Client Hub access",
  "I have a question",
  "Request a demo",
  "Support request",
];

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

const supportTopics = ["Billing", "Portal", "Calls", "Integrations", "Other"];
const questionTopics = ["Pricing", "Setup", "Features", "Security & Privacy", "Other"];

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

const initialFormData = {
  name: "",
  email: "",
  reason: "",
  message: "",
  businessName: "",
  businessType: "",
  website: "",
  phone: "",
  timezone: "",
  supportTopic: "",
  questionTopic: "",
  preferredContact: "email",
};

const Request = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setShowDetails(false);
    setSubmitted(false);
  };

  const conditionalFields = useMemo(() => {
    if (formData.reason === "Request Client Hub access") return "access";
    if (formData.reason === "Support request") return "support";
    if (formData.reason === "I have a question") return "question";
    return null;
  }, [formData.reason]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.email.trim()) missing.push("Work Email");
    if (!formData.reason) missing.push("Reason");
    if (!formData.message.trim()) missing.push("Message");
    if (conditionalFields === "access" && !formData.businessName.trim()) missing.push("Business Name");

    if (missing.length > 0) {
      toast({ title: "Please complete the required fields", description: missing.join(", "), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    trackEvent({ event_name: "form_submit", event_category: "form", metadata: { form: "request" } });

    try {
      const topicInfo = formData.supportTopic || formData.questionTopic;
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        businessName: formData.businessName.trim(),
        businessType: formData.businessType || formData.reason,
        phone: formData.phone.trim(),
        website: formData.website.trim(),
        timezone: formData.timezone,
        callVolume: "",
        preferredContact: formData.preferredContact,
        message: `[${formData.reason}]${topicInfo ? ` [${topicInfo}]` : ""} ${formData.message.trim()}`,
      };

      await supabase.functions.invoke("send-contact-email", { body: submitData });
      trackEvent({ event_name: "form_success", event_category: "form", metadata: { form: "request" } });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Request error:", error);
      trackEvent({ event_name: "form_error", event_category: "form", metadata: { form: "request" } });
      toast({ title: "Something went wrong", description: "Please try again or email us at hello@clearwayai.co", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="elevated-card p-8 md:p-10 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <MailCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Request received</h1>
                  <p className="text-sm text-muted-foreground mb-8">
                    Thanks — we'll follow up by email.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" size="default" className="flex-1 btn-glow" asChild>
                      <a href="https://hub-clearwayai.com/login" target="_blank" rel="noopener noreferrer">Back to Sign in</a>
                    </Button>
                    <Button variant="outline" size="default" className="flex-1 gap-2" onClick={handleReset}>
                      <RotateCcw className="w-3.5 h-3.5" />
                      Send another request
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
      {/* Subtle radial glow behind content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-28 pb-16 relative">
        <div className="container mx-auto px-4">
          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <p className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              Client Hub Access
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              Request Access or{" "}
              <span className="gradient-text">Ask a Question</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground/80">
              Send a message and we'll follow up by email.
            </p>
          </motion.div>

          {/* ── What Happens Next (inline under hero) ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: ClipboardCheck, label: "We review your request" },
                { icon: MailCheck, label: "We follow up by email" },
                { icon: ArrowRight, label: "If access is needed, we send next steps" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[11px] text-muted-foreground/70 leading-snug">{item.label}</span>
                </div>
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
              {/* Existing clients */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <LogIn className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">For existing clients</h3>
                </div>
                <p className="text-[12px] text-muted-foreground/70 mb-3">
                  Already have an account?
                </p>
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <a href="https://hub-clearwayai.com/login" target="_blank" rel="noopener noreferrer">
                    Sign in
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>

              {/* Contact */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">Contact</h3>
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
                  If you prefer email or a quick call.
                </p>
              </div>

              {/* About this form */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">About this form</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Use this to request portal access or ask a question.",
                    "Details help us route your message to the right person.",
                    "Access can be issued by invitation where applicable.",
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
              <div className="elevated-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
                {/* Subtle gradient accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-[80px] pointer-events-none" />

                <div className="relative">
                  <div className="mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      Send a Request
                    </h2>
                    <p className="text-xs text-muted-foreground/70">
                      Choose a reason so we can route you correctly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
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
                          className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm"
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
                          className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm"
                        />
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground/80">Reason *</Label>
                      <Select
                        value={formData.reason}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, reason: value, supportTopic: "", questionTopic: "" }))}
                      >
                        <SelectTrigger className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          {reasonOptions.map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conditional fields */}
                    <AnimatePresence mode="wait">
                      {conditionalFields === "access" && (
                        <motion.div
                          key="access"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label htmlFor="businessName" className="text-xs font-medium text-foreground/80">Business Name *</Label>
                              <Input
                                id="businessName"
                                name="businessName"
                                placeholder="Acme Corp"
                                value={formData.businessName}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Industry</Label>
                              <Select
                                value={formData.businessType}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                              >
                                <SelectTrigger className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm">
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
                          <div className="space-y-1.5">
                            <Label htmlFor="website" className="text-xs font-medium text-foreground/80">Website</Label>
                            <Input
                              id="website"
                              name="website"
                              type="url"
                              placeholder="https://yoursite.com"
                              value={formData.website}
                              onChange={handleChange}
                              maxLength={255}
                              className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm"
                            />
                          </div>
                        </motion.div>
                      )}

                      {conditionalFields === "support" && (
                        <motion.div
                          key="support"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground/80">What do you need help with?</Label>
                            <Select
                              value={formData.supportTopic}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, supportTopic: value }))}
                            >
                              <SelectTrigger className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm">
                                <SelectValue placeholder="Select topic" />
                              </SelectTrigger>
                              <SelectContent className="bg-background border-border">
                                {supportTopics.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}

                      {conditionalFields === "question" && (
                        <motion.div
                          key="question"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground/80">Topic</Label>
                            <Select
                              value={formData.questionTopic}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, questionTopic: value }))}
                            >
                              <SelectTrigger className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm">
                                <SelectValue placeholder="Select topic" />
                              </SelectTrigger>
                              <SelectContent className="bg-background border-border">
                                {questionTopics.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-medium text-foreground/80">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us what you're trying to achieve and any relevant context…"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        maxLength={1000}
                        rows={4}
                        className="bg-muted/40 border-border/60 focus:border-primary resize-none text-sm"
                      />
                    </div>

                    {/* Optional details accordion */}
                    <button
                      type="button"
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
                    >
                      {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      Add details (optional)
                    </button>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium text-foreground/80">Time Zone</Label>
                              <Select
                                value={formData.timezone}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, timezone: value }))}
                              >
                                <SelectTrigger className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm">
                                  <SelectValue placeholder="Auto-detected if blank" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border max-h-60">
                                  {timezoneOptions.map((tz) => (
                                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground/80">Preferred contact method</Label>
                            <Select
                              value={formData.preferredContact}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredContact: value }))}
                            >
                              <SelectTrigger className="bg-muted/40 border-border/60 focus:border-primary h-10 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-background border-border">
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="phone">Phone</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <div className="space-y-3 pt-2">
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-5 rounded-xl btn-glow"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Request"}
                        {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                      </Button>
                      <div className="text-center space-y-0.5">
                        <p className="text-[10px] text-muted-foreground/60">
                          You'll receive an email confirmation.
                        </p>
                        <p className="text-[10px] text-muted-foreground/60">
                          No marketing promises — just a reply to your request.
                        </p>
                      </div>
                    </div>
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
