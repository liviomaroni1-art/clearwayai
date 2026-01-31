import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock } from "lucide-react";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const businessTypes = [
  "Auto Shop / Mechanic",
  "Car Wash",
  "Gardening / Landscaping",
  "Cleaning Services",
  "Plumbing",
  "Electrical Services",
  "HVAC / Heating & Cooling",
  "Roofing",
  "Construction",
  "Real Estate",
  "Dental Practice",
  "Medical Practice",
  "Law Firm",
  "Accounting / Tax Services",
  "Insurance Agency",
  "Salon / Spa",
  "Fitness / Gym",
  "Restaurant / Cafe",
  "Retail Store",
  "E-Commerce",
  "Logistics / Delivery",
  "IT Services",
  "Marketing Agency",
  "Consulting",
  "Other",
];

const budgetOptions = [
  "$1,500/month (Solo Launch)",
  "$2,500/month (Pro Practice)",
  "$3,500/month (Team Pro)",
  "$5,000+/month (Concierge AI)",
  "Not sure yet - need guidance",
];

const serviceOptions = [
  "AI Receptionist (Phone Handling)",
  "Email Automation",
  "Customer Support Automation",
  "Lead Qualification",
  "Workflow Automation",
  "Website Creation",
  "Multiple Services",
  "Not sure - need consultation",
];

const termOptions = [
  { value: "monthly", label: "Monthly", discount: null },
  { value: "annual", label: "1 Year", discount: "10% off" },
  { value: "36-months", label: "36 Months", discount: "20% off + $0 setup" },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    businessType: "",
    budget: "",
    service: "",
    term: "",
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
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", company: "", phone: "", website: "", businessType: "", budget: "", service: "", term: "", message: "" });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or email us directly at sales@clearwayai.co",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Book Your Free <span className="text-primary">Consultation</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your business and we'll show you exactly how AI can save you time and money.
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
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <a href="mailto:sales@clearwayai.co" className="text-primary hover:underline">
                      sales@clearwayai.co
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Freienbach, Switzerland</p>
                    <p className="text-sm text-muted-foreground">Serving US & Global clients</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Response Time</h3>
                    <p className="text-muted-foreground">Within 24-48 hours</p>
                    <p className="text-sm text-muted-foreground">Usually much faster</p>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-4">Why Choose Us?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Live in 72 hours or less
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    99.9% uptime guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    30+ languages supported
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    No long-term lock-in required
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10">
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
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
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
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
                      />
                    </div>
                  </div>

                  {/* Company & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company <span className="text-muted-foreground font-normal">(optional)</span></Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company"
                        value={formData.company}
                        onChange={handleChange}
                        maxLength={100}
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
                      />
                    </div>
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
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
                      />
                    </div>
                  </div>

                  {/* Website Link */}
                  <div className="space-y-2">
                    <Label htmlFor="website">Website <span className="text-muted-foreground font-normal">(if available)</span></Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleChange}
                      maxLength={255}
                      className="bg-white/5 border-white/10 focus:border-primary h-12"
                    />
                  </div>

                  {/* Business Type Dropdown */}
                  <div className="space-y-2">
                    <Label>What type of business do you have? *</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleSelectChange("businessType", value)}
                      required
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary h-12">
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/10 max-h-60">
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service Interest */}
                  <div className="space-y-2">
                    <Label>What service are you interested in? *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleSelectChange("service", value)}
                      required
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary h-12">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/10">
                        {serviceOptions.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Term & Budget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Preferred Term *</Label>
                      <Select
                        value={formData.term}
                        onValueChange={(value) => handleSelectChange("term", value)}
                        required
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary h-12">
                          <SelectValue placeholder="Select term length" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/10">
                          {termOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <span className="flex items-center gap-2">
                                {option.label}
                                {option.discount && (
                                  <span className="text-xs text-primary font-medium">({option.discount})</span>
                                )}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>What's your budget range? *</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleSelectChange("budget", value)}
                        required
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary h-12">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/10">
                          {budgetOptions.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project and how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={5}
                      className="bg-white/5 border-white/10 focus:border-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-4 pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 rounded-2xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Book Consultation"}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      No spam. We'll only contact you about your request.
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
