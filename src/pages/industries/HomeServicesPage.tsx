import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Clock, TrendingUp, Wrench, Flame, Droplets, Zap, Shield, Calendar, MessageSquare, PhoneIncoming, ClipboardCheck, Send, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";

const demoNumber = "+1 (888) 778-3091";

/* ── DATA ── */

const steps = [
  {
    icon: PhoneIncoming,
    step: "01",
    title: "Homeowner Calls — Day or Night",
    description: "A burst pipe at 2 AM or a thermostat quote on Saturday. The AI picks up in under 2 seconds, identifies the issue, and confirms they're in your service area.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "AI Triages & Qualifies",
    description: "It separates emergencies from routine requests, collects the address, job type, and tenant vs. homeowner — then routes by urgency.",
  },
  {
    icon: Send,
    step: "03",
    title: "Job Booked, Crew Notified",
    description: "The appointment drops into your calendar. You get a text with caller name, address, job type, and urgency level — ready to dispatch.",
  },
];

const benefits = [
  { icon: Phone, title: "Zero Missed Emergency Calls", description: "Every after-hours and on-the-truck call gets answered. Stop losing $500+ jobs to voicemail." },
  { icon: Calendar, title: "More Jobs Booked Per Week", description: "AI books directly into your calendar — no phone tag, no callbacks, no double-booking." },
  { icon: Clock, title: "15+ Hours Saved Weekly", description: "Your office manager stops playing dispatcher. Your techs stop pulling over to answer the phone." },
  { icon: TrendingUp, title: "Higher Revenue, Same Crew", description: "Capture the leads you're already paying for through Google Ads and home advisor — you're just not answering them." },
  { icon: Shield, title: "Professional First Impression", description: "Every caller gets a consistent, friendly experience — not a rushed answer from a crawlspace." },
  { icon: Users, title: "30+ Languages Built In", description: "Serve multilingual households naturally. No menu prompts, no hiring bilingual staff." },
];

const caseStudy = {
  company: "Rapid Response Plumbing",
  location: "Phoenix, AZ",
  role: "Mike R., Owner",
  quote: "We were missing 5–6 calls a day while the guys were on the truck. In the first month with Clearway, we booked 22 more emergency jobs. My office manager finally has time to actually manage the office.",
  metrics: [
    { label: "Missed calls / week", before: "28", after: "3" },
    { label: "Emergency jobs / month", before: "34", after: "56" },
    { label: "Front-desk phone hours / week", before: "20 h", after: "5 h" },
    { label: "Monthly revenue from calls", before: "$15,300", after: "$25,200" },
  ],
};

const integrations = [
  "Google Calendar", "Outlook", "Housecall Pro", "ServiceTitan", "Jobber",
  "Zapier", "n8n", "Google Sheets", "Slack", "SMS / Text",
];

const faqs = [
  {
    question: "Can the AI tell the difference between an emergency and a routine call?",
    answer: "Yes. It triages by urgency automatically. A burst pipe at midnight triggers an instant SMS to your on-call tech. A quote request gets booked into your next available slot. You set the rules during onboarding.",
  },
  {
    question: "What about after-hours and weekend calls?",
    answer: "Covered 24/7/365 — nights, weekends, holidays. Every call is answered in under 2 seconds. No voicemail tree, no 'leave a message.' The AI handles it like your best front-desk person would.",
  },
  {
    question: "Does it know my service area?",
    answer: "We configure your exact coverage zones during setup. The AI confirms the caller's location before booking, so you never roll a truck outside your territory.",
  },
  {
    question: "How does it compare in cost to a dispatcher or answering service?",
    answer: "Plans start at $1,500/month — roughly a third of a full-time dispatcher ($3,500–$4,500/month) and far more consistent than a traditional answering service. It never calls in sick, never puts callers on hold, and works every holiday.",
  },
  {
    question: "Can I keep my existing business number?",
    answer: "Absolutely. We set up call forwarding from your current number. Your customers won't notice anything different — calls just get answered faster and more consistently.",
  },
  {
    question: "Does it work with Housecall Pro, ServiceTitan, or Jobber?",
    answer: "We integrate natively with Google Calendar and Outlook. Housecall Pro, ServiceTitan, and Jobber connect via Zapier or n8n. We handle the entire integration setup for you — no extra charge.",
  },
  {
    question: "How long does setup take?",
    answer: "Most companies are live within 72 hours. We design your call flow, configure integrations, run test calls, and hand it over ready to go. You just forward your number.",
  },
];

const trades = [
  { icon: Droplets, name: "Plumbing" },
  { icon: Flame, name: "HVAC" },
  { icon: Zap, name: "Electrical" },
  { icon: Wrench, name: "General Contracting" },
];

/* ── COMPONENT ── */

const HomeServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Receptionist for Plumbers, HVAC & Electricians | Clearway AI"
        description="Clearway AI answers plumbing, HVAC & electrical calls 24/7 — even from the truck. Capture every emergency lead, book more jobs, and stop losing revenue to voicemail."
        canonical="https://clearwayai.co/industries/home-services"
      />
      <StructuredData type="organization" />
      <StructuredData type="service" />
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs mb-6"
            >
              <span className="text-primary font-medium">Built for plumbing, HVAC & electrical companies</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 text-foreground"
            >
              Stop Losing Jobs
              <br />
              <span className="gradient-text">to Missed Calls.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
            >
              Your AI receptionist picks up every call in under 2 seconds — 24/7. It triages emergencies, books jobs into your calendar, and texts you a summary. Even when you're under a sink.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-5"
            >
              <Button variant="hero" size="lg" className="w-full sm:w-auto btn-glow hover:scale-[1.03] transition-all" asChild>
                <Link
                  to="/contact"
                  onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "home-services-hero", label: "Book Your Free Call Flow Review" } })}
                >
                  Book Your Free Call Flow Review
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <a
                href={`tel:${demoNumber.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] border border-border/50 rounded-full px-6 hover:border-primary/30"
              >
                <Phone className="w-4 h-4" />
                Hear the AI Live: {demoNumber}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10"
            >
              {["Live in ~72 hours", "No long-term contract", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Trade badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {trades.map((trade) => (
                <div key={trade.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/30 border border-border/30 rounded-full text-xs text-muted-foreground">
                  <trade.icon className="w-3.5 h-3.5 text-primary" />
                  {trade.name}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-14 md:py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">From ring to booked job — without pulling over.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            <div className="space-y-8 md:space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5 md:gap-8 items-start"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-card border border-primary/20 flex items-center justify-center relative z-10">
                      <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 z-20 text-[11px] font-bold text-primary-foreground bg-primary rounded-full w-6 h-6 flex items-center justify-center ring-2 ring-background">
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-1 md:pt-3">
                    <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BENEFITS ═══════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              What You Actually <span className="gradient-text">Get</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">Your AI dispatcher — always on, never on break, never on the truck.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <b.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CASE STUDY ═══════════ */}
      <section className="py-14 md:py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              Real <span className="gradient-text">Results</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">From a plumbing company that switched to Clearway AI.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">{caseStudy.company}</span>
                  <span>· {caseStudy.location}</span>
                </div>
                <MessageSquare className="w-5 h-5 text-primary/40 mb-3" />
                <blockquote className="text-sm md:text-base font-medium text-foreground leading-relaxed mb-4">
                  "{caseStudy.quote}"
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  — <span className="font-semibold text-foreground">{caseStudy.role}</span>
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Key Results (First 30 Days)
                </h3>
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-xs text-muted-foreground">{m.label}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="line-through text-muted-foreground/60">{m.before}</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                      <span className="font-bold text-primary">{m.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ INTEGRATIONS ═══════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              Works With Your <span className="gradient-text">Existing Tools</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">We plug into what you already use — no rip-and-replace.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
            {integrations.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 bg-muted/30 border border-border/50 rounded-full text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-14 md:py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              Common <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">Everything home service owners ask before going live.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/15 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                Live in <span className="gradient-text">~72 Hours</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-lg mx-auto">
                Book a free 15-minute call flow review. We'll map how calls hit your business today and show you exactly where emergency leads are slipping through the cracks.
              </p>
              <Button variant="hero" size="lg" className="btn-glow hover:scale-105 transition-all" asChild>
                <Link
                  to="/contact"
                  onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "home-services-bottom", label: "Book Your Free Call Flow Review" } })}
                >
                  Book Your Free Call Flow Review
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {["15 minutes", "No obligation", "We reply within 24–48h"].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                Or try the AI yourself:{" "}
                <a href={`tel:${demoNumber.replace(/\s/g, "")}`} className="text-primary hover:underline">
                  {demoNumber}
                </a>
                {" "}(live demo line, available 24/7)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeServicesPage;
