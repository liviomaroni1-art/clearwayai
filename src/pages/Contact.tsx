import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Quote,
  MessageSquare,
  PhoneCall,
  MailCheck,
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

const challenges = [
  "Missing calls after hours or on weekends",
  "Front desk overwhelmed during peak times",
  "Leads going to voicemail and never calling back",
  "No-shows and last-minute cancellations",
  "Too much time on repetitive phone questions",
  "Need multilingual call handling",
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [submitted, setSubmitted] = useState(false);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    message: "",
    businessName: "",
    website: "",
    phone: "",
    timezone: "",
    callVolume: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleChallenge = (challenge: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(challenge) ? prev.filter((c) => c !== challenge) : [...prev, challenge]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.email.trim()) missing.push("Work Email");
    if (!formData.businessType) missing.push("Business Type");

    if (missing.length > 0) {
      toast({ title: "Please complete the required fields", description: missing.join(", "), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    trackEvent({ event_name: "form_submit", event_category: "form", metadata: { form: "demo" } });

    try {
      const challengeText = selectedChallenges.length > 0 ? selectedChallenges.join("; ") : "";
      const messageText = [challengeText, formData.message.trim()].filter(Boolean).join(" | ") || "Demo request";

      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        businessName: formData.businessName.trim(),
        businessType: formData.businessType,
        phone: formData.phone.trim(),
        website: formData.website.trim(),
        timezone: formData.timezone,
        callVolume: formData.callVolume.trim(),
        preferredContact: "email",
        message: messageText,
        formType: "demo" as const,
      };

      const edgeFnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      await fetch(edgeFnUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify(submitData),
      });
      trackEvent({ event_name: "form_success", event_category: "form", metadata: { form: "demo" } });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Demo request error:", error);
      trackEvent({ event_name: "form_error", event_category: "form", metadata: { form: "demo" } });
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
                  <h1 className="text-2xl font-bold text-foreground mb-2">We've got your request!</h1>
                  <p className="text-sm text-muted-foreground mb-8">
                    We'll review your call flow and follow up by email.
                  </p>
                  <Button variant="hero" size="default" className="w-full btn-glow" asChild>
                    <Link to="/">Back to Clearway AI</Link>
                  </Button>
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
      <SEOHead 
        title="Contact Clearway AI — Book a Free Demo Call"
        description="Get in touch with Clearway AI. Book a free 15-minute call flow review and see how our AI receptionist can answer your calls 24/7."
        canonical="https://clearwayai.co/contact"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <main className="pt-28 pb-16 relative">
        <div className="container mx-auto px-4">
          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-3 leading-tight">
              Get Your Free{" "}
              <span className="gradient-text">Call Flow Review</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-xl mx-auto">
              15 minutes. No obligation. We map your call flow and show you exactly where leads are slipping through.
            </p>
          </motion.div>

          {/* ── 2-Column Layout ── */}
          <div className="grid lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
            {/* LEFT — Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1"
            >
              {/* Testimonial */}
              <div className="glass-card p-5 rounded-xl">
                <Quote className="w-4 h-4 text-primary/50 mb-2.5" />
                <p className="text-[13px] text-foreground leading-relaxed font-medium mb-2.5">
                  "We booked 12 more appointments in the first month. Setup took less than a day."
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  — Practice Manager, Dental Clinic (Austin, TX)
                </p>
              </div>

              {/* Email */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">Prefer email?</h3>
                </div>
                <a href="mailto:hello@clearwayai.co" className="text-[13px] text-primary hover:underline font-medium">
                  hello@clearwayai.co
                </a>
              </div>

              {/* Phone */}
              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <PhoneCall className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">Hear the AI live</h3>
                </div>
                <a href="tel:+18885602165" className="text-[13px] text-foreground/80 hover:text-primary transition-colors font-medium">
                  +1 (888) 560-2165
                </a>
                <p className="text-[10px] text-muted-foreground/50 mt-1">Optional — no account needed</p>
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
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                           className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-medium text-foreground/80">Work Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jane@smileclinic.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          maxLength={255}
                           className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm"
                         />
                         <p className="text-[10px] text-muted-foreground/50">So we can send your personalized review</p>
                      </div>
                    </div>

                    {/* Business Type */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-foreground/80">Business Type *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                      >
                         <SelectTrigger className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border max-h-60">
                          {industryOptions.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Challenges */}
                     <div className="space-y-2">
                       <Label className="text-xs font-medium text-foreground/80">
                         What's your biggest challenge?{" "}
                         <span className="text-muted-foreground/50 font-normal">(select all that apply)</span>
                       </Label>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {challenges.map((challenge) => {
                          const isSelected = selectedChallenges.includes(challenge);
                          return (
                            <button
                              key={challenge}
                              type="button"
                              onClick={() => toggleChallenge(challenge)}
                              className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-[11px] transition-all duration-200 ${
                                isSelected
                                  ? "border-primary/50 bg-primary/5 text-foreground"
                                  : "border-border/40 bg-muted/20 text-muted-foreground/70 hover:border-border/60 hover:text-foreground/80"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                                  isSelected ? "border-primary bg-primary" : "border-border/60"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                                )}
                              </div>
                              {challenge}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-medium text-foreground/80">
                        Anything else we should know?{" "}
                        <span className="text-muted-foreground/50 font-normal">(optional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="e.g. We use Calendly for scheduling and have 3 staff answering calls..."
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={1000}
                        rows={3}
                        className="bg-muted/60 border-border/50 focus:border-primary resize-none text-sm"
                      />
                    </div>

                    {/* Additional details */}
                    <div className="space-y-1.5 pt-2">
                      <p className="text-xs font-medium text-foreground/80">Additional details <span className="text-muted-foreground/50 font-normal">(optional — helps us prepare your demo)</span></p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="businessName" className="text-xs font-medium text-foreground/80">Business Name</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          placeholder="Smile Dental Clinic"
                          value={formData.businessName}
                          onChange={handleChange}
                          maxLength={100}
                          className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm"
                        />
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
                          className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm"
                        />
                      </div>
                    </div>
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
                          className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground/80">Time Zone</Label>
                        <Select
                          value={formData.timezone}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, timezone: value }))}
                        >
                          <SelectTrigger className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm">
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
                      <Label htmlFor="callVolume" className="text-xs font-medium text-foreground/80">Est. Calls / Month</Label>
                      <Input
                        id="callVolume"
                        name="callVolume"
                        placeholder="e.g. 200-400"
                        value={formData.callVolume}
                        onChange={handleChange}
                        maxLength={50}
                        className="bg-muted/60 border-border/50 focus:border-primary h-9 text-sm"
                      />
                    </div>

                     {/* Submit */}
                     <div className="space-y-2.5 pt-1">
                       <Button
                         type="submit"
                         className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-4 rounded-xl btn-glow"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Get My Free Call Flow Review"}
                        {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                      </Button>
                      <p className="text-center text-[10px] text-muted-foreground/50">
                        No spam · No sales pressure
                      </p>
                    </div>

                    {/* What Happens Next */}
                    <div className="pt-4 border-t border-border/30">
                      <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-4">
                        What happens next
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { step: "1", text: "We review your call flow and identify gaps" },
                          { step: "2", text: "You get a 15-min personalized walkthrough" },
                          { step: "3", text: "Go live in ~72 hours — no tech work on your end" },
                        ].map((item) => (
                          <div key={item.step} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold text-primary">{item.step}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">{item.text}</p>
                          </div>
                        ))}
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

export default Contact;
