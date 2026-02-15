import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Quote,
  MessageSquare,
  PhoneCall,
  ClipboardCheck,
  MailCheck,
  ArrowRight,
  Shield,
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

const Request = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
    businessName: "",
    businessType: "",
    website: "",
    phone: "",
    timezone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.email.trim()) missing.push("Work Email");
    if (!formData.reason) missing.push("Reason");
    if (!formData.message.trim()) missing.push("Message");

    if (missing.length > 0) {
      toast({
        title: "Please complete the required fields",
        description: missing.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    trackEvent({
      event_name: "form_submit",
      event_category: "form",
      metadata: { form: "request" },
    });

    try {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        businessName: formData.businessName.trim(),
        businessType: formData.businessType || formData.reason,
        phone: formData.phone.trim(),
        website: formData.website.trim(),
        timezone: formData.timezone,
        callVolume: "",
        preferredContact: "email",
        message: `[${formData.reason}] ${formData.message.trim()}`,
      };

      await supabase.functions.invoke("send-contact-email", {
        body: submitData,
      });

      trackEvent({
        event_name: "form_success",
        event_category: "form",
        metadata: { form: "request" },
      });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Request error:", error);
      trackEvent({
        event_name: "form_error",
        event_category: "form",
        metadata: { form: "request" },
      });
      toast({
        title: "Something went wrong",
        description: "Please try again or email us at hello@clearwayai.co",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MailCheck className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Thanks — we received your request.
                </h1>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll reply by email.
                </p>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full"
                  >
                    Go to Client Login
                  </Button>
                </Link>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <a
                  href="mailto:hello@clearwayai.co"
                  className="text-[11px] text-primary hover:underline"
                >
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-3">
              Client Hub Access
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Request Access or{" "}
              <span className="gradient-text">Ask a Question</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Send us a message and we'll respond by email.
            </p>
          </motion.div>

          {/* ── 2-Column Layout ── */}
          <div className="grid lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
            {/* LEFT — Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              {/* Testimonial card */}
              <div className="glass-card p-5 rounded-xl">
                <Quote className="w-5 h-5 text-primary/60 mb-3" />
                <p className="text-sm text-foreground leading-relaxed italic mb-3">
                  "Clearway helped us organize inbound calls and follow-up."
                </p>
                <p className="text-[11px] text-muted-foreground">
                  — Operations Lead, Service Business{" "}
                  <span className="text-muted-foreground/50">(example)</span>
                </p>
              </div>

              {/* Email card */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">
                    Prefer email?
                  </h3>
                </div>
                <a
                  href="mailto:hello@clearwayai.co"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  hello@clearwayai.co
                </a>
                <p className="text-[11px] text-muted-foreground mt-1">
                  We'll reply by email.
                </p>
              </div>

              {/* Phone card */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <PhoneCall className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">
                    Talk to our team
                  </h3>
                </div>
                <a
                  href="tel:+18887783091"
                  className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                >
                  +1 (888) 778-3091
                </a>
                <p className="text-[11px] text-muted-foreground mt-1">
                  If you'd rather speak with someone.
                </p>
              </div>

              {/* Privacy note */}
              <div className="flex items-start gap-2 px-1">
                <Shield className="w-3.5 h-3.5 text-muted-foreground/50 mt-0.5 shrink-0" />
                <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
                  We use your details to respond and, if requested, to set up
                  access.
                </p>
              </div>
            </motion.div>

            {/* RIGHT — Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="glass-card p-5 md:p-7 rounded-2xl">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-foreground mb-0.5">
                    Client Hub Access & Questions
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Fill in the form below and we'll get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-xs">
                        Full Name *
                      </Label>
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
                      <Label htmlFor="email" className="text-xs">
                        Work Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={255}
                        className="bg-muted/50 border-border focus:border-primary h-9 text-sm"
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="space-y-1">
                    <Label className="text-xs">Reason *</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, reason: value }))
                      }
                    >
                      <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-9 text-sm">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {reasonOptions.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={4}
                      className="bg-muted/50 border-border focus:border-primary resize-none text-sm"
                    />
                  </div>

                  {/* Optional details accordion */}
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showDetails ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                    Add more details (optional)
                  </button>

                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 pt-1"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="businessName" className="text-xs">
                            Business Name
                          </Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            placeholder="Acme Corp"
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
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                businessType: value,
                              }))
                            }
                          >
                            <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-9 text-sm">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border max-h-60">
                              {industryOptions.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="website" className="text-xs">
                            Website
                          </Label>
                          <Input
                            id="website"
                            name="website"
                            type="url"
                            placeholder="https://yoursite.com"
                            value={formData.website}
                            onChange={handleChange}
                            maxLength={255}
                            className="bg-muted/50 border-border focus:border-primary h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="phone" className="text-xs">
                            Phone
                          </Label>
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
                        <Label className="text-xs">Time Zone</Label>
                        <Select
                          value={formData.timezone}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              timezone: value,
                            }))
                          }
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
                    </motion.div>
                  )}

                  {/* Submit */}
                  <div className="space-y-3 pt-1">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-5 rounded-xl btn-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Request"}
                      {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                    </Button>
                    <div className="text-center space-y-0.5">
                      <p className="text-[10px] text-muted-foreground">
                        We'll email you a confirmation.
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        No spam.
                      </p>
                    </div>
                  </div>
                </form>

                {/* Login link */}
                <div className="mt-5 pt-4 border-t border-border/40 text-center">
                  <p className="text-xs text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── What Happens Next ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-5xl mx-auto mt-10"
          >
            <div className="glass-card p-5 md:p-6 rounded-2xl">
              <h3 className="text-xs font-semibold text-foreground mb-5 text-center uppercase tracking-wider">
                What happens next
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: ClipboardCheck,
                    step: "1",
                    title: "We review your request",
                    desc: "Our team looks over your message and any details you've shared.",
                  },
                  {
                    icon: MailCheck,
                    step: "2",
                    title: "We follow up by email",
                    desc: "You'll hear back from us with answers or next steps.",
                  },
                  {
                    icon: ArrowRight,
                    step: "3",
                    title: "If access is needed, we'll send next steps",
                    desc: "We'll provide instructions to get started with Client Hub.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Request;
