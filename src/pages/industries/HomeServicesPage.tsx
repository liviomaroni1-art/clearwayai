import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Clock, TrendingUp, Wrench, Flame, Droplets, Zap, Shield, Calendar, MessageSquare, PhoneIncoming, ClipboardCheck, Send, BarChart3 } from "lucide-react";
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
    title: "Call Comes In",
    description: "A homeowner calls — emergency or routine. The AI picks up in under 2 seconds, identifies the issue, and confirms they're in your service area.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Qualified & Triaged",
    description: "The AI determines urgency (burst pipe vs. quote request), collects address and job details, and routes accordingly.",
  },
  {
    icon: Send,
    step: "03",
    title: "Job Booked & Dispatched",
    description: "The appointment lands in your calendar. You get a text with caller name, address, job type, and urgency — ready to roll.",
  },
];

const benefits = [
  { icon: Phone, title: "Fewer Missed Emergency Calls", description: "Every after-hours and on-the-truck call gets answered — no more $500 jobs lost to voicemail." },
  { icon: Calendar, title: "More Booked Jobs Per Week", description: "AI books directly into your calendar. No phone tag, no callbacks, no double-booking." },
  { icon: Clock, title: "15+ Hours Saved Per Week", description: "Stop spending half the day answering phones. Let your team focus on the work that pays." },
  { icon: TrendingUp, title: "Higher Revenue, Same Crew", description: "Capture leads you were already paying for — just not answering. More jobs, same overhead." },
  { icon: Shield, title: "Professional First Impression", description: "Every caller gets a consistent, friendly experience — no rushed answers from the truck." },
  { icon: MessageSquare, title: "30+ Languages Supported", description: "Serve multilingual households naturally without hiring bilingual staff." },
];

const caseStudy = {
  company: "Rapid Response Plumbing",
  location: "Phoenix, AZ",
  role: "Mike R., Owner",
  quote: "I was missing 5–6 calls a day on the truck. In the first month with Clearway, we booked 22 more emergency jobs and my guys stopped complaining about the phone ringing during installs.",
  metrics: [
    { label: "Missed calls/week", before: "28", after: "3", positive: true },
    { label: "Emergency jobs booked/month", before: "34", after: "56", positive: true },
    { label: "Front-desk phone hours/week", before: "20h", after: "5h", positive: true },
    { label: "Monthly revenue from calls", before: "$15,300", after: "$25,200", positive: true },
  ],
};

const integrations = [
  "Google Calendar", "Outlook", "Housecall Pro", "ServiceTitan", "Jobber",
  "Zapier", "n8n", "Google Sheets", "Slack", "SMS / Text",
];

const faqs = [
  { question: "Can the AI handle emergency calls differently?", answer: "Yes. It triages by urgency — a burst pipe at midnight gets treated differently than a quote request. High-urgency calls trigger instant notifications to your on-call tech." },
  { question: "What hours does it cover?", answer: "24/7/365. Nights, weekends, holidays — every call gets answered in under 2 seconds. No voicemail, no missed revenue." },
  { question: "Does it know my service area?", answer: "Yes. We configure your coverage zones during setup. The AI confirms the caller's location before booking, so you never roll a truck outside your area." },
  { question: "How much does it cost compared to a dispatcher?", answer: "Plans start at $1,500/month — about a third of a full-time dispatcher ($3,500–$4,500/month) and far more reliable than a traditional answering service. Plus, it never calls in sick." },
  { question: "Can I keep my existing business number?", answer: "Absolutely. We set up call forwarding from your current number. Your customers won't notice anything different — calls just get answered faster." },
  { question: "Does it work with Housecall Pro or ServiceTitan?", answer: "We integrate natively with Google Calendar and Outlook. Housecall Pro, ServiceTitan, and Jobber are available via Zapier or n8n. We handle the entire setup for you." },
  { question: "What languages does it support?", answer: "30+ languages including Spanish. It detects the caller's language automatically and responds naturally — no menu prompts." },
  { question: "How long does setup take?", answer: "Most companies are live within 72 hours. We handle call flow design, integrations, and testing. You just forward your number." },
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
        title="AI Receptionist for Plumbers, HVAC & Home Services | Clearway AI"
        description="Clearway AI answers plumbing, HVAC, and contractor calls 24/7 — even from the job site. Capture every emergency lead, book jobs automatically, and stop losing customers to voicemail."
        canonical="https://clearwayai.co/industries/home-services"
      />
      <StructuredData type="organization" />
      <StructuredData type="service" />
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8"
            >
              <span className="text-primary font-medium">Trusted by plumbing, HVAC & electrical companies across the US</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 text-foreground"
            >
              Every Emergency Call Answered.
              <br />
              <span className="gradient-text">Every Job Booked.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              AI receptionist that picks up in under 2 seconds — 24/7 — triages emergencies, and books jobs straight into your calendar. Even when you're on the truck. Live in ~72 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6"
            >
              <Button variant="hero" size="lg" className="w-full sm:w-auto min-h-[52px] btn-glow hover:scale-[1.03] transition-all px-8" asChild>
                <Link
                  to="/contact"
                  onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "home-services-hero", label: "Book Your Free Demo" } })}
                >
                  Book Your Free Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <a
                href={`tel:${demoNumber.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] border border-border/50 rounded-full px-6 hover:border-primary/30"
              >
                <Phone className="w-4 h-4" />
                Hear the AI Live: {demoNumber}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12"
            >
              {["Live in ~72 hours", "No long-term contract", "Stop losing emergency calls to competitors"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {trades.map((trade) => (
                <div key={trade.name} className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full text-xs text-muted-foreground">
                  <trade.icon className="w-3.5 h-3.5 text-primary" />
                  {trade.name}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From ring to booked job in under 60 seconds.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-px bg-border" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5 items-start"
                >
                  <div className="w-[78px] flex-shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-primary font-semibold tracking-widest uppercase">Step {step.step}</span>
                    <h3 className="text-lg font-bold text-foreground mt-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BENEFITS ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              What You Actually <span className="gradient-text">Get</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Your AI dispatcher — always on, never on break.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CASE STUDY ═══════════ */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Real <span className="gradient-text">Results</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card rounded-2xl p-6 md:p-10"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Quote side */}
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">{caseStudy.company}</span>
                  <span>· {caseStudy.location}</span>
                </div>
                <MessageSquare className="w-5 h-5 text-primary/40 mb-3" />
                <blockquote className="text-base md:text-lg font-medium text-foreground leading-relaxed mb-4">
                  "{caseStudy.quote}"
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{caseStudy.role}</span>
                </p>
              </div>

              {/* Metrics side */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Key Results
                </h3>
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="line-through text-muted-foreground/60">{m.before}</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                      <span className="font-semibold text-primary">{m.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ INTEGRATIONS ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Works With Your <span className="gradient-text">Existing Tools</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We plug into what you already use — no rip-and-replace.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {integrations.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-5 py-2.5 bg-muted/30 border border-border/50 rounded-full text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Common <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-14 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/15 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Live in ~72 Hours
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Book a free 15-minute call flow review. We'll map how calls hit your business and show you exactly where leads are slipping through.
              </p>
              <Button variant="hero" size="lg" className="min-h-[48px] md:min-h-[56px] btn-glow hover:scale-105 transition-all" asChild>
                <Link
                  to="/contact"
                  onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "home-services-bottom", label: "Book Your Free Demo" } })}
                >
                  Book Your Free Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                {["15 minutes", "No obligation", "We reply within 24–48h"].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeServicesPage;
