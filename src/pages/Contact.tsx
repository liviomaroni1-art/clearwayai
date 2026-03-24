import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const businessTypes = {
  de: [
    "Handwerksbetrieb",
    "Unternehmensberatung",
    "Kanzlei (Anwalt / Steuerberater / Notar)",
    "Marketing- oder Werbeagentur",
    "Coaching oder Training",
    "Immobilien",
    "IT- oder Softwareunternehmen",
    "Gesundheit & Wellness",
    "Finanzdienstleistungen",
    "Sonstige Dienstleistung",
  ],
  en: [
    "Skilled trades / contractor",
    "Management consulting",
    "Law firm / tax advisory / notary",
    "Marketing or advertising agency",
    "Coaching or training",
    "Real estate",
    "IT / software company",
    "Health & wellness",
    "Financial services",
    "Other service business",
  ],
};

const challenges = {
  de: [
    "Zu wenige qualifizierte Leads",
    "Abhängigkeit von Empfehlungen",
    "Unregelmäßiger Umsatz / keine planbare Pipeline",
    "Zu viel Zeit mit Kaltakquise",
    "Anzeigen schalten sich nicht profitabel",
    "Keine Zeit für Marketing",
    "Sonstiges",
  ],
  en: [
    "Not enough qualified leads",
    "Over-reliance on referrals",
    "Inconsistent revenue / no predictable pipeline",
    "Too much time on cold outreach",
    "Ad campaigns not profitable",
    "No time for marketing",
    "Other",
  ],
};

const phonePrefixes = ["+41 (Schweiz)", "+43 (Österreich)", "+49 (Deutschland)"];

const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phonePrefix: "+41 (Schweiz)",
    phone: "",
    company: "",
    businessType: "",
    website: "",
    challenge: "",
    message: "",
  });

  const isDE = language === 'de';

  const labels = {
    pageTitle: isDE ? "Jetzt Gespräch buchen" : "Book a Strategy Call",
    pageSubtitle: isDE
      ? "Erzählen Sie uns von Ihrem Unternehmen. Wir melden uns innerhalb von 24 Stunden."
      : "Tell us about your business. We'll get back to you within 24 hours.",
    firstName: isDE ? "Vorname" : "First name",
    lastName: isDE ? "Nachname" : "Last name",
    email: isDE ? "E-Mail-Adresse" : "Email address",
    phonePrefix: isDE ? "Vorwahl" : "Prefix",
    phone: isDE ? "Telefonnummer" : "Phone number",
    company: isDE ? "Unternehmen" : "Company",
    businessType: isDE ? "Art des Unternehmens" : "Type of business",
    businessTypePlaceholder: isDE ? "Bitte auswählen" : "Please select",
    website: isDE ? "Website (optional)" : "Website (optional)",
    challenge: isDE ? "Größte Herausforderung" : "Biggest challenge",
    challengePlaceholder: isDE ? "Bitte auswählen" : "Please select",
    message: isDE ? "Weitere Informationen (optional)" : "Additional information (optional)",
    messagePlaceholder: isDE
      ? "Beschreiben Sie kurz Ihr Angebot und was Sie sich von der Zusammenarbeit erhoffen."
      : "Briefly describe your offer and what you hope to achieve.",
    submit: isDE ? "Gespräch anfragen" : "Request a call",
    submitting: isDE ? "Wird gesendet…" : "Sending…",
    disclaimer: isDE
      ? "Keine Verpflichtung. Wir melden uns innerhalb von 24 Stunden."
      : "No commitment. We'll get back to you within 24 hours.",
    successTitle: isDE ? "Anfrage erhalten!" : "Request received!",
    successMessage: isDE
      ? "Vielen Dank. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden."
      : "Thank you. We'll be in touch within 24 hours.",
    sideTitle: isDE ? "Was Sie erwartet" : "What to expect",
    side1: isDE ? "Kurzes Kennenlerngespräch (ca. 20 Min.)" : "Brief intro call (~20 min)",
    side2: isDE ? "Wir analysieren Ihr Angebot und Ihre Zielgruppe" : "We analyse your offer and target audience",
    side3: isDE ? "Sie erhalten einen konkreten Kampagnenplan" : "You receive a concrete campaign plan",
    side4: isDE ? "Kein Druck, keine Verpflichtung" : "No pressure, no commitment",
    required: isDE ? "Pflichtfeld" : "Required",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: `${formData.phonePrefix.split(' ')[0]} ${formData.phone}`,
          company: formData.company,
          businessName: formData.company,
          businessType: formData.businessType,
          website: formData.website,
          message: formData.challenge
            ? `${formData.challenge}${formData.message ? '\n\n' + formData.message : ''}`
            : formData.message || '',
          formType: 'demo',
          preferredContact: 'email',
          timezone: '',
          callVolume: '',
        },
      });

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      toast({
        title: isDE ? "Fehler beim Senden" : "Submission error",
        description: isDE
          ? "Bitte versuchen Sie es erneut oder schreiben Sie uns an hello@clearwayai.co"
          : "Please try again or email us at hello@clearwayai.co",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={isDE ? "Gespräch buchen — Clearway AI" : "Book a Call — Clearway AI"}
        description={isDE
          ? "Buchen Sie ein kostenloses Strategiegespräch mit Clearway AI. Done-for-you Lead-Generierung für Dienstleistungsunternehmen im DACH-Raum."
          : "Book a free strategy call with Clearway AI. Done-for-you lead generation for service businesses in the DACH region."}
        canonical="https://clearwayai.co/contact"
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {labels.pageTitle}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {labels.pageSubtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              {isSubmitted ? (
                <div className="glass-card p-10 text-center rounded-2xl">
                  <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-3">{labels.successTitle}</h2>
                  <p className="text-muted-foreground">{labels.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-5">
                  {/* Name row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-sm">{labels.firstName} *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder={isDE ? "Max" : "John"}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-sm">{labels.lastName} *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder={isDE ? "Mustermann" : "Smith"}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm">{labels.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="max@unternehmen.de"
                      className="bg-background/50"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label className="text-sm">{labels.phone} *</Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.phonePrefix}
                        onValueChange={(v) => setFormData({ ...formData, phonePrefix: v })}
                      >
                        <SelectTrigger className="w-48 bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {phonePrefixes.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="079 123 45 67"
                        className="flex-1 bg-background/50"
                        type="tel"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-sm">{labels.company} *</Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={isDE ? "Musterfirma GmbH" : "Acme Ltd."}
                      className="bg-background/50"
                    />
                  </div>

                  {/* Business type */}
                  <div className="space-y-1.5">
                    <Label className="text-sm">{labels.businessType} *</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(v) => setFormData({ ...formData, businessType: v })}
                      required
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder={labels.businessTypePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes[language].map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Website */}
                  <div className="space-y-1.5">
                    <Label htmlFor="website" className="text-sm">{labels.website}</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://www.unternehmen.de"
                      className="bg-background/50"
                      type="url"
                    />
                  </div>

                  {/* Challenge */}
                  <div className="space-y-1.5">
                    <Label className="text-sm">{labels.challenge} *</Label>
                    <Select
                      value={formData.challenge}
                      onValueChange={(v) => setFormData({ ...formData, challenge: v })}
                      required
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder={labels.challengePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {challenges[language].map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm">{labels.message}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={labels.messagePlaceholder}
                      rows={4}
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? labels.submitting : labels.submit}
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {labels.disclaimer}
                  </p>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-display font-bold text-foreground mb-5">{labels.sideTitle}</h3>
                <ul className="space-y-4">
                  {[labels.side1, labels.side2, labels.side3, labels.side4].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6 rounded-2xl text-sm text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-2">hello@clearwayai.co</p>
                <p>Clearway AI<br />Freienbach, Switzerland</p>
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
