import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  "Consulting",
  "Other",
];

const estimatedLossOptions = [
  "Under $1,000/month",
  "$1,000 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000 - $25,000/month",
  "$25,000+/month",
  "Not sure",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    service: "AI Phone Receptionist",
    estimatedLoss: "",
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
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.phone.trim()) missing.push("Phone");
    if (!formData.businessType) missing.push("Business Type");

    if (missing.length > 0) {
      toast({
        title: "Please fill in all required fields",
        description: missing.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24-48 hours.",
      });
      
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        website: "", 
        businessType: "", 
        service: "AI Phone Receptionist",
        estimatedLoss: "", 
        preferredContact: "email",
        message: "" 
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
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
              Book a <span className="gradient-text">Demo</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              15 minutes. No obligation. We'll map your call flow and show you exactly how Clearway AI can help.
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
              {/* Call Demo Box */}
              <div className="glass-card border-primary/30 p-6 rounded-2xl bg-primary/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Call the Live Demo</h3>
                    <p className="text-xs text-muted-foreground">Experience the AI now</p>
                  </div>
                </div>
                <a
                  href={`tel:${demoNumber.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-xl font-bold transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {demoNumber}
                </a>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <a href="mailto:hello@clearwayai.co" className="text-primary hover:underline">
                      hello@clearwayai.co
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Response Time</h3>
                    <p className="text-muted-foreground">Within 24-48 hours</p>
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
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={255}
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div className="space-y-2">
                    <Label>Business Type *</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleSelectChange("businessType", value)}
                      required
                    >
                      <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-12">
                        <SelectValue placeholder="Select your business type" />
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

                  {/* Service Interest - Defaulted */}
                  <div className="space-y-2">
                    <Label>Service Interest</Label>
                    <Input
                      value="AI Phone Receptionist"
                      disabled
                      className="bg-muted/30 border-border h-12 text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground">
                      Need other services? Mention them in your message below.
                    </p>
                  </div>

                  {/* Phone & Website Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength={20}
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website <span className="text-muted-foreground font-normal">(optional)</span></Label>
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
                  </div>

                  {/* Estimated Loss */}
                  <div className="space-y-2">
                    <Label>Estimated monthly loss from missed calls/leads <span className="text-muted-foreground font-normal">(optional)</span></Label>
                    <Select
                      value={formData.estimatedLoss}
                      onValueChange={(value) => handleSelectChange("estimatedLoss", value)}
                    >
                      <SelectTrigger className="bg-muted/50 border-border focus:border-primary h-12">
                        <SelectValue placeholder="Select estimated loss" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {estimatedLossOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-3">
                    <Label>Preferred contact method</Label>
                    <RadioGroup
                      value={formData.preferredContact}
                      onValueChange={(value) => handleSelectChange("preferredContact", value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact-email" />
                        <Label htmlFor="contact-email" className="font-normal cursor-pointer">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="contact-phone" />
                        <Label htmlFor="contact-phone" className="font-normal cursor-pointer">Phone</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-muted-foreground font-normal">(optional)</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your current call handling challenges..."
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={1000}
                      rows={4}
                      className="bg-muted/50 border-border focus:border-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-4 pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 rounded-2xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Book a Demo"}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      We reply within 24-48 hours. No spam.
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
