import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Mail, Clock, Phone, Shield, CheckCircle2, ChevronDown } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const callChallenges = [
  "Missing calls after hours or on weekends",
  "Front desk overwhelmed during peak times",
  "Leads going to voicemail and never calling back",
  "No-shows and last-minute cancellations",
  "Too much time on repetitive phone questions",
  "Need multilingual call handling",
];

const callVolumeOptions = [
  "Under 50",
  "50–150",
  "150–500",
  "500+",
  "Not sure",
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
  const [showOptional, setShowOptional] = useState(false);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    timezone: "",
    callVolume: "",
    preferredContact: "email",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleChallenge = (challenge: string) => {
    setSelectedChallenges(prev =>
      prev.includes(challenge)
        ? prev.filter(c => c !== challenge)
        : [...prev, challenge]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.email.trim()) missing.push("Work Email");
    if (!formData.businessType) missing.push("Business Type");

    if (missing.length > 0) {
      toast({
        title: "Almost there — just a few more details",
        description: `Please fill in: ${missing.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    trackEvent({ event_name: "form_submit", event_category: "form", metadata: { form: "contact", businessType: formData.businessType } });

    try {
      const submitData = {
        ...formData,
        message: selectedChallenges.length > 0
          ? `Challenges: ${selectedChallenges.join("; ")}${formData.message ? `\n\nAdditional context: ${formData.message}` : ""}`
          : formData.message,
      };

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: submitData
      });

      if (error) throw error;

      trackEvent({ event_name: "form_success", event_category: "form", metadata: { form: "contact" } });
      navigate("/contact/success");
    } catch (error: any) {
      console.error('Error sending message:', error);
      trackEvent({ event_name: "form_error", event_category: "form", metadata: { form: "contact" } });
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at hello@clearwayai.co",
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

      <main className="pt-36 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Get Your Free <span className="gradient-text">Call Flow Review</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              15 minutes. No obligation. We map your call flow and show you exactly where leads are slipping through.
            </p>
          </motion.div>

          {/* Mobile trust strip — visible only on mobile, above form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-8 lg:hidden"
          >
            {[
              { icon: Clock, text: "Reply within 24–48h" },
              { icon: Shield, text: "No spam, no pressure" },
              { icon: Phone, text: "15-min review, free" },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <item.icon className="w-3.5 h-3.5 text-primary" />
                {item.text}
              </span>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            {/* Left Trust Strip — desktop only, slim */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:flex lg:col-span-4 flex-col gap-5"
            >
              {/* Mini testimonial */}
              <div className="glass-card p-5 rounded-2xl">
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  "We booked 12 more appointments in the first month. Setup took less than a day."
                </p>
                <p className="text-xs text-muted-foreground">
                  — Practice Manager, Dental Clinic (Austin, TX)
                </p>
              </div>

              {/* Contact card */}
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Prefer email?</h3>
                <a
                  href="mailto:hello@clearwayai.co"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  hello@clearwayai.co
                </a>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  Reply within 24–48 hours
                </div>
              </div>

              {/* Live demo line */}
              <div className="glass-card p-5 rounded-2xl">
                <h3 className="text-sm font-semibold text-foreground mb-2">Hear the AI live</h3>
                <a
                  href={`tel:${demoNumber.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {demoNumber}
                </a>
                <p className="text-xs text-muted-foreground mt-1">Optional — no account needed</p>
              </div>

              {/* Privacy/security note */}
              <div className="flex items-start gap-2 px-1">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your data is encrypted and never shared. We're GDPR-compliant and HIPAA-aligned.
                </p>
              </div>
            </motion.div>

            {/* Contact Form — main column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="glass-card p-6 md:p-8 rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Step 1: Core fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="bg-muted/50 border-border focus:border-primary h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">Work Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@smileclinic.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={255}
                        className="bg-muted/50 border-border focus:border-primary h-11"
                      />
                      <p className="text-[11px] text-muted-foreground">So we can send your personalized review</p>
                    </div>
                  </div>

                  {/* Business Type — required */}
                  <div className="space-y-1.5">
                    <Label className="text-sm">Business Type *</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleSelectChange("businessType", value)}
                      required
                    >
                      <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-11">
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

                  {/* Call Challenges — checkboxes instead of textarea */}
                  <div className="space-y-3">
                    <Label className="text-sm">What's your biggest challenge? <span className="text-muted-foreground font-normal">(select all that apply)</span></Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {callChallenges.map((challenge) => (
                        <label
                          key={challenge}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                            selectedChallenges.includes(challenge)
                              ? "border-primary/50 bg-primary/5 text-foreground"
                              : "border-border/50 bg-muted/20 text-muted-foreground hover:border-border hover:text-foreground"
                          }`}
                        >
                          <Checkbox
                            checked={selectedChallenges.includes(challenge)}
                            onCheckedChange={() => toggleChallenge(challenge)}
                            className="mt-0.5 shrink-0"
                          />
                          <span className="leading-snug">{challenge}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Optional context textarea — always visible but not required */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm">
                      Anything else we should know? <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="e.g. We use Calendly for scheduling and have 3 staff answering calls..."
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={1000}
                      rows={2}
                      className="bg-muted/50 border-border focus:border-primary resize-none"
                    />
                  </div>

                  {/* Progressive Disclosure: Optional fields */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowOptional(!showOptional)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${showOptional ? "rotate-180" : ""}`} />
                      Add more details for a better demo
                    </button>

                    {showOptional && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="businessName" className="text-sm">
                              Business Name <span className="text-muted-foreground font-normal">(optional)</span>
                            </Label>
                            <Input
                              id="businessName"
                              name="businessName"
                              placeholder="Smile Dental Clinic"
                              value={formData.businessName}
                              onChange={handleChange}
                              maxLength={100}
                              className="bg-muted/50 border-border focus:border-primary h-11"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm">
                              Time Zone <span className="text-muted-foreground font-normal">(optional)</span>
                            </Label>
                            <Select
                              value={formData.timezone}
                              onValueChange={(value) => handleSelectChange("timezone", value)}
                            >
                              <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-11">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="website" className="text-sm">
                              Website <span className="text-muted-foreground font-normal">(optional)</span>
                            </Label>
                            <Input
                              id="website"
                              name="website"
                              type="url"
                              placeholder="https://yourwebsite.com"
                              value={formData.website}
                              onChange={handleChange}
                              maxLength={255}
                              className="bg-muted/50 border-border focus:border-primary h-11"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-sm">
                              Phone <span className="text-muted-foreground font-normal">(optional)</span>
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={handleChange}
                              maxLength={20}
                              className="bg-muted/50 border-border focus:border-primary h-11"
                            />
                          </div>
                        </div>

                        {/* Call volume chips */}
                        <div className="space-y-2">
                          <Label className="text-sm">
                            Estimated calls per month <span className="text-muted-foreground font-normal">(optional)</span>
                          </Label>
                          <RadioGroup
                            value={formData.callVolume}
                            onValueChange={(value) => handleSelectChange("callVolume", value)}
                            className="flex flex-wrap gap-2"
                          >
                            {callVolumeOptions.map((option) => (
                              <div key={option} className="flex items-center">
                                <RadioGroupItem value={option} id={`vol-${option}`} className="peer sr-only" />
                                <Label
                                  htmlFor={`vol-${option}`}
                                  className="cursor-pointer px-3.5 py-1.5 rounded-lg border border-border bg-muted/30 text-xs font-normal text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-foreground"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* CTA + What happens next */}
                  <div className="space-y-4 pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-6 rounded-2xl btn-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Get My Free Call Flow Review"}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      No spam · No sales pressure · Reply within 24–48h
                    </p>
                  </div>

                  {/* What happens next — inline */}
                  <div className="border-t border-border/40 pt-5 mt-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">What happens next</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { step: "1", text: "We review your call flow and identify gaps" },
                        { step: "2", text: "You get a 15-min personalized walkthrough" },
                        { step: "3", text: "Go live in ~72 hours — no tech work on your end" },
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-primary">{item.step}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              {/* Mobile-only: Privacy note below form */}
              <div className="flex items-start gap-2 mt-4 px-1 lg:hidden">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your data is encrypted and never shared. GDPR-compliant and HIPAA-aligned.
                </p>
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
