import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock, Phone, Globe } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.businessName.trim()) missing.push("Business Name");
    if (!formData.email.trim()) missing.push("Work Email");
    if (!formData.businessType) missing.push("Business Type");
    if (!formData.timezone) missing.push("Country / Time Zone");

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
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
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
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Get Your Free <span className="gradient-text">Call Flow Review</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              15 minutes. No obligation. We'll map your call flow and show you exactly how many leads you're missing — and how to fix it.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Email - Primary */}
              <div className="glass-card border-primary/30 p-6 rounded-2xl bg-primary/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-xs text-muted-foreground">Fastest way to reach us</p>
                  </div>
                </div>
                <a
                  href="mailto:hello@clearwayai.co"
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-xl font-bold transition-all"
                >
                  <Mail className="w-5 h-5" />
                  hello@clearwayai.co
                </a>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Response Time</h3>
                    <p className="text-muted-foreground">Within 24–48 hours</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Freienbach, Switzerland</p>
                    <p className="text-sm text-muted-foreground">Serving US clients</p>
                  </div>
                </div>
              </div>

              {/* Optional live demo line */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Optional Live Demo Line</h3>
                    <p className="text-xs text-muted-foreground">Hear the AI receptionist in action</p>
                  </div>
                </div>
                <a
                  href={`tel:${demoNumber.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 border border-primary/30 hover:bg-primary/10 text-foreground px-4 py-3 rounded-xl font-medium transition-all"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {demoNumber}
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8 md:p-10 rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name & Business Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        placeholder="Smile Dental Clinic"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@smileclinic.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      className="bg-muted/50 border-border focus:border-primary h-12"
                    />
                  </div>

                  {/* Business Type & Country/Timezone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Business Type *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => handleSelectChange("businessType", value)}
                        required
                      >
                        <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-12">
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
                    <div className="space-y-2">
                      <Label>Country / Time Zone *</Label>
                      <Select
                        value={formData.timezone}
                        onValueChange={(value) => handleSelectChange("timezone", value)}
                        required
                      >
                        <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-12">
                          <SelectValue placeholder="Select your time zone" />
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

                  {/* Challenge / Open question */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your call challenges *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="e.g. We miss about 20 calls a week after hours, and our front desk can't keep up during peak times..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={3}
                      className="bg-muted/50 border-border focus:border-primary resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      What's your biggest challenge with missed calls or call handling?
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/50 pt-6">
                    <p className="text-sm text-muted-foreground mb-5">Optional — helps us prepare a better demo for you</p>
                  </div>

                  {/* Website & Phone (optional) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">
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
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
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
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                  </div>

                  {/* Call volume (radio buttons) */}
                  <div className="space-y-3">
                    <Label>
                      Estimated calls per month <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <RadioGroup
                      value={formData.callVolume}
                      onValueChange={(value) => handleSelectChange("callVolume", value)}
                      className="flex flex-wrap gap-3"
                    >
                      {callVolumeOptions.map((option) => (
                        <div key={option} className="flex items-center">
                          <RadioGroupItem value={option} id={`vol-${option}`} className="peer sr-only" />
                          <Label
                            htmlFor={`vol-${option}`}
                            className="cursor-pointer px-4 py-2 rounded-lg border border-border bg-muted/30 text-sm font-normal text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-foreground"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-3">
                    <Label>How should we reach you?</Label>
                    <RadioGroup
                      value={formData.preferredContact}
                      onValueChange={(value) => handleSelectChange("preferredContact", value)}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact-email" />
                        <Label htmlFor="contact-email" className="font-normal cursor-pointer">
                          📧 Email <span className="text-muted-foreground">(recommended)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="contact-phone" />
                        <Label htmlFor="contact-phone" className="font-normal cursor-pointer text-muted-foreground">
                          📞 Only if you prefer a quick call
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-4 pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 rounded-2xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Get My 15-Minute Call Flow Review"}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      We reply within 24–48 hours. No spam, no sales pressure — just a quick walkthrough.
                    </p>
                  </div>
                </form>
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
