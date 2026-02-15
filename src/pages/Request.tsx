import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
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
import logo from "@/assets/clearway-logo-new.png";

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

const Request = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    trackEvent({ event_name: "form_submit", event_category: "form", metadata: { form: "request" } });

    try {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        businessName: formData.businessName.trim(),
        businessType: formData.businessType || formData.reason,
        phone: formData.phone.trim(),
        website: "",
        timezone: "",
        callVolume: "",
        preferredContact: "email",
        message: `[${formData.reason}] ${formData.message.trim()}`,
      };

      await supabase.functions.invoke("send-contact-email", {
        body: submitData,
      });

      trackEvent({ event_name: "form_success", event_category: "form", metadata: { form: "request" } });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Request error:", error);
      trackEvent({ event_name: "form_error", event_category: "form", metadata: { form: "request" } });
      toast({
        title: "Something went wrong",
        description: "Please try again or email us at hello@clearwayai.co",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md text-center"
        >
          <div className="flex justify-center mb-8">
            <Link to="/">
              <img src={logo} alt="Clearway AI" className="h-6 w-auto" />
            </Link>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">Thanks — we received your request.</h1>
            <p className="text-sm text-muted-foreground mb-6">
              We'll reply by email.
            </p>
            <Link to="/login">
              <Button variant="outline" size="default" className="w-full">
                Go to Client Login
              </Button>
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            <Mail className="w-3 h-3 text-muted-foreground" />
            <a href="mailto:hello@clearwayai.co" className="text-[11px] text-primary hover:underline">
              hello@clearwayai.co
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo + heading */}
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={logo} alt="Clearway AI" className="h-6 w-auto" />
            </Link>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="mb-5">
              <p className="text-[10px] font-medium text-primary uppercase tracking-wider mb-1">Client Hub Access</p>
              <h1 className="text-xl font-bold text-foreground mb-1">Request Access or Ask a Question</h1>
              <p className="text-xs text-muted-foreground">
                We'll respond by email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, reason: value }))}
                >
                  <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-9 text-sm">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {reasonOptions.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  rows={3}
                  className="bg-muted/50 border-border focus:border-primary resize-none text-sm"
                />
              </div>

              {/* Optional details */}
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                Add details (optional)
              </button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="businessName" className="text-xs">Business Name</Label>
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
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                      >
                        <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-9 text-sm">
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
                </motion.div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-5 rounded-xl btn-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Request"}
                {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            {/* Login link */}
            <div className="mt-5 pt-4 border-t border-border/40 text-center">
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/privacy" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="text-muted-foreground/30 text-[11px]">·</span>
            <Link to="/terms" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>

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

export default Request;
